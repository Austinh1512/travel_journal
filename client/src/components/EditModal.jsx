import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EntryForm from "./EntryForm";

export default function EditModal(props) {
  return (
    <>
      {props.modalOptions.type === "delete" && (
        <Modal show onHide={props.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.toggle}>
              Close
            </Button>
            <Button variant="danger" onClick={props.modalOptions.action}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {props.modalOptions.type === "update" && (
        <Modal show onHide={props.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Update Entry:</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <EntryForm
              requestMethod="put"
              entryID={props.entryID}
              initialValues={props.initialValues}
              updateJournalEntry={props.modalOptions.action}
              toggleModal={props.toggle}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
