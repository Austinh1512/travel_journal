import { useEffect, useState } from "react"
import JournalEntry from "../components/JournalEntry"
import EntryForm from "../components/EntryForm"
import Button from "react-bootstrap/Button"
import axios from "axios"

export default function Home() {
    const [showForm, setShowForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);

  const toggleForm = () => { setShowForm(prev => !prev) }

  const addJournalEntry = (newEntry) => {
    setJournalEntries(prevEntries => {
      return [...prevEntries, newEntry];
    })
  }

  const deleteJournalEntry = (id) => {
    axios.delete(`entries/${id}`)
      .then(() => { setJournalEntries((prevEntries) => prevEntries.filter(entry => entry._id !== id)); })
  }

  const updateJournalEntry = (id, updated_entry) => {
    setJournalEntries(prevEntries => prevEntries.map(entry => entry._id === id ? updated_entry : entry));
  }

  useEffect(() => {
    axios.get("http://localhost:5000/entries")
      .then(res => { setJournalEntries(res.data) })
  }, [])

  const getEntries = () => {
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
              thumbnail: item.thumbnail,
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
            {getEntries()}
            <div className="form--container">
            <Button variant="primary" size="lg" className="form--btn" onClick={toggleForm} href="#create-new-form" >
                { !showForm ? "Create New +" : "Nevermind :(" }
            </Button>
            { showForm && <EntryForm addJournalEntry={addJournalEntry} requestMethod="post" /> }
            </div>
        </>
    )
}
