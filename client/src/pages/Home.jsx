import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import JournalEntry from "../components/JournalEntry"
import EntryForm from "../components/EntryForm"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import axios from "../api/axios"
import AuthContext from "../context/AuthContext"
import useAxiosInterceptors from "../hooks/useAxiosInterceptors"
import useErrorHandler from "../hooks/useErrorHandler"

export default function Home() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const axiosAuth = useAxiosInterceptors();
  const navigate = useNavigate();
  const params = useParams();
  const handleError = useErrorHandler();

  const toggleForm = () => { setShowForm(prev => !prev) }

  const addJournalEntry = (newEntry) => {
    setJournalEntries(prevEntries => {
      return [...prevEntries, newEntry];
    })
  }

  const deleteJournalEntry = async (id) => {
    try {
      await axiosAuth.delete(`/entries/${id}`, { withCredentials: true });
      setUser(prev => ({
        ...prev,
        success: "Successfully deleted entry."
      }))
      setJournalEntries((prevEntries) => prevEntries.filter(entry => entry._id !== id));
      setShowSuccessAlert(true);
    } catch(err) {
        handleError(err);
        setShowErrorAlert(true);
        navigate(`/entries/${user.userID}`);
    }
    
  }

  const updateJournalEntry = (id, updated_entry) => {
    setJournalEntries(prevEntries => prevEntries.map(entry => entry._id === id ? updated_entry : entry));
  }

  const displayEntries = () => {
    if (journalEntries.length) {
      return journalEntries.map(item => {
        return <JournalEntry 
            key={item._id}
            id={item._id}
            values={{
              place: item.place,
              country: item.country,
              startDate: item.startDate,
              endDate: item.endDate,
              images: item.images,
              description: item.description
            }}
            deleteJournalEntry={() => deleteJournalEntry(item._id)}
            updateJournalEntry={updateJournalEntry}
          />
      })
    } 
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/entries/${params.id}`);
        setJournalEntries(res.data);
      } catch(err) {
        handleError(err);
        setShowErrorAlert(true);
        navigate(`/entries/${user.userID}`);
      }
      
    })()
    }, [user])

  //Check for errors coming from other pages
  useEffect(() => {
    if (user.success) {
      setShowSuccessAlert(true);
    }

    if (user.error) {
      setShowErrorAlert(true);
    }
  }, [])

    return (
        <div className="d-flex flex-column">
          <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(!showErrorAlert)} dismissible className="mt-3 align-self-center" >
              <div className="d-flex justify-content-center align-items-center" >
                <p>{ user.error }</p>
              </div>
          </Alert>
          <Alert variant="success" show={showSuccessAlert} onClose={() => setShowSuccessAlert(!showSuccessAlert)} dismissible className="mt-3 align-self-center" >
              <div className="d-flex justify-content-center align-items-center" >
                <p>{ user.success }</p>
              </div>
          </Alert>
          {displayEntries()}
          <div className="form--container">
          { user.userID === params.id && <Button variant="primary" size="lg" className="form--btn" onClick={toggleForm} href="#create-new-form" >
              { !showForm ? "Create New +" : "Nevermind :(" }
          </Button> }
          { showForm && <EntryForm addJournalEntry={addJournalEntry} requestMethod="post" /> }
          </div>
        </div>
    )
}
