import { useState } from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EditModal from "./EditModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JournalEntry(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalOptions, setModalOptions] = useState({
        type: "",
        action: ""
    });

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    }

    const formatDate = (date) => {
        const d = new Date(`${date}T00:00`);
        const options = { month: "short",  year: "numeric", day: "numeric"};
        return new Intl.DateTimeFormat("en-us", options).format(d);

    }

    return (
        <>
        { showModal &&  <EditModal toggle={toggleModal} modalOptions={modalOptions} entryID={props.id} initialValues={props.values} />}
        <Card className="mt-5">
            <Row className="g-0">
                <Col md={3} lg={2} className="d-flex flex-column">
                    <Card.Img variant="left" className="rounded card--thumbnail align-self-center" src={props.values.thumbnail} />
                    <div className="mt-3 d-flex justify-content-center gap-4">
                        <Button className="card--btn" onClick={() => { toggleModal(); setModalOptions({ type: "update", action: props.updateJournalEntry }); }}>
                            <FontAwesomeIcon icon="pen-to-square" />
                        </Button>
                        <Button className="card--btn" onClick={() => { toggleModal(); setModalOptions({ type: "delete", action: props.deleteJournalEntry }); }}>
                            <FontAwesomeIcon icon="trash" />
                        </Button>
                    </div>
                </Col>
                <Col md={9} lg={10}>
                    <Card.Body className="ps-4">
                        <div className="card--location">
                            <FontAwesomeIcon icon="location-dot" color="#F55A5A" />
                            <p>{props.values.country.toUpperCase()}</p>
                            <Card.Link href="#" className="ms-4">View on Google Maps</Card.Link>
                        </div>
                        <Card.Title className="display-5 bold">{props.values.place}</Card.Title>
                        <Card.Subtitle className="my-4 ps-1">{formatDate(props.values.startDate)} - {formatDate(props.values.endDate)}</Card.Subtitle>
                        <Card.Text className="card--description lead">{props.values.description}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
        <hr></hr>
        </>
    )
}