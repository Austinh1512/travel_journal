import Modal from "react-bootstrap/Modal"
import EditEntryForm from "../forms/EditEntryForm"

export default function EditModal(props) {
    return (
            <Modal show={props.show} onHide={props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Entry:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                   <EditEntryForm initialValues={props.initialValues} toggleModal={props.toggle} entryID={props.entryID} updateJournalEntry={props.updateJournalEntry} />
                </Modal.Body>
            </Modal>
    )
}