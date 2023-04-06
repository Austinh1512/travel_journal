import Modal from "react-bootstrap/Modal"
import EntryForm from "../EntryForm"

export default function EditModal(props) {
    return (
            <Modal show={props.show} onHide={props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Entry:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <EntryForm requestMethod="put" entryID={props.entryID} initialValues={props.initialValues} updateJournalEntry={props.update} toggleModal={props.toggle} />
                </Modal.Body>
            </Modal>
    )
}