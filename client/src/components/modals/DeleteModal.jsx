import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function DeleteModal(props) {
    return (
            <Modal show onHide={props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this entry? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.toggle}>Close</Button>
                    <Button variant="danger" onClick={props.delete}>Delete</Button>
                </Modal.Footer>
            </Modal>
    )
    
}