import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Clipboard } from "react-bootstrap-icons"

export default function ShareModal({ toggle }) {
    const { user } = useContext(AuthContext);
    const URL = `http://localhost:5173/entries/${user.userID}`;

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(URL);
    }

    return (
        <Modal show onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Share Your Journey</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex gap-2">
                <Form.Control type="text" value={URL} readOnly />
                <Button onClick={copyToClipboard} className="d-flex justify-content-center align-items-center card--btn">
                    <Clipboard />
                </Button>
            </Modal.Body>
        </Modal>
    )
}