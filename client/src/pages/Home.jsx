import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JournalEntry from "../components/JournalEntry";
import NewEntryForm from "../components/forms/NewEntryForm";
import PaginationNav from "../components/PaginationNav";
import CustomAlert from "../components/CustomAlert";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import AlertContext from "../context/AlertContext";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";
import useErrorHandler from "../hooks/useErrorHandler";

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const { user } = useContext(AuthContext);
  const { alert, setAlert } = useContext(AlertContext);
  const axios = useAxiosInterceptors();
  const navigate = useNavigate();
  const params = useParams();
  const handleError = useErrorHandler();

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const addJournalEntry = (newEntry) => {
    setJournalEntries((prevEntries) => {
      return [...prevEntries, newEntry];
    });
  };

  const deleteJournalEntry = async (id) => {
    try {
      const res = await axios.delete(`/entries/${id}`, {
        withCredentials: true,
      });
      setAlert(res.data);
      setJournalEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== id)
      );
      setShowAlert(true);
    } catch (err) {
      handleError(err);
      setShowAlert(true);
      navigate(`/entries/${user.userID}`);
    }
  };

  const updateJournalEntry = (id, updated_entry) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) => (entry._id === id ? updated_entry : entry))
    );
  };

  //Request journal entries
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/entries/${params.id}`);
        setJournalEntries(res.data);
      } catch (err) {
        handleError(err);
        setShowAlert(true);
        if (Boolean(user.userID))
          navigate(`/entries/${user.userID}`, { replace: true });
        else navigate("/");
      }
    })();
  }, [user]);

  //Check for errors coming from other pages
  useEffect(() => {
    if (Boolean(alert.type)) setShowAlert(true);
  }, [alert]);

  //Get entries for current page
  const lastIndexOfPage = currentPage * postsPerPage;
  const firstIndexOfPage = lastIndexOfPage - postsPerPage;
  const currentEntries = journalEntries.slice(
    firstIndexOfPage,
    lastIndexOfPage
  );

  const displayEntries = () => {
    if (currentEntries.length) {
      return currentEntries.map((item) => {
        return (
          <JournalEntry
            key={item._id}
            id={item._id}
            values={{
              place: item.place,
              country: item.country,
              startDate: item.startDate,
              endDate: item.endDate,
              images: item.images,
              description: item.description,
            }}
            deleteJournalEntry={() => deleteJournalEntry(item._id)}
            updateJournalEntry={updateJournalEntry}
          />
        );
      });
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column">
      <CustomAlert show={showAlert} dismiss={() => setShowAlert(false)} />
      {displayEntries()}
      <PaginationNav
        totalPosts={journalEntries.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="form--container">
        {user.userID === params.id && (
          <Button
            variant="primary"
            size="lg"
            className="form--btn"
            onClick={toggleForm}
            href="#create-new-form"
          >
            {!showForm ? "Create New +" : "Nevermind :("}
          </Button>
        )}
        {showForm && (
          <NewEntryForm addJournalEntry={addJournalEntry} toggle={toggleForm} />
        )}
      </div>
    </div>
  );
}
