import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import JournalEntry from "../components/JournalEntry"
import EntryForm from "../components/EntryForm"
import Button from "react-bootstrap/Button"
import axios from "../api/axios"
import AuthContext from "../context/AuthContext"
import useAxiosInterceptors from "../hooks/useAxiosInterceptors"

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosAuth = useAxiosInterceptors();
  const navigate = useNavigate();
  const params = useParams();

  const toggleForm = () => { setShowForm(prev => !prev) }

  const addJournalEntry = (newEntry) => {
    setJournalEntries(prevEntries => {
      return [...prevEntries, newEntry];
    })
  }

  const deleteJournalEntry = async (id) => {
    try {
      await axiosAuth.delete(`/entries/${id}`, { withCredentials: true });
      setJournalEntries((prevEntries) => prevEntries.filter(entry => entry._id !== id));
    } catch(err) {
      console.error(err);
    }
    
  }

  const updateJournalEntry = (id, updated_entry) => {
    setJournalEntries(prevEntries => prevEntries.map(entry => entry._id === id ? updated_entry : entry));
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/entries?id=${params.id}`);
        setJournalEntries(res.data);
      } catch(err) {
        navigate("/usernotfound");
      }
      
    })()
    }, [])

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

    return (
        <>
            {displayEntries()}
            <div className="form--container">
            { user.userID === params.id && <Button variant="primary" size="lg" className="form--btn" onClick={toggleForm} href="#create-new-form" >
                { !showForm ? "Create New +" : "Nevermind :(" }
            </Button> }
            { showForm && <EntryForm addJournalEntry={addJournalEntry} requestMethod="post" /> }
            </div>
        </>
    )
}
