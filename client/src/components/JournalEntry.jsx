import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import DeleteModal from "./modals/DeleteModal"
import EditModal from "./modals/EditModal"
import CarouselModel from "./modals/CarouselModal"
import { PencilSquare, Trash, GeoAltFill, ZoomIn } from "react-bootstrap-icons"
import CustomTooltip from "./CustomTooltip"


export default function JournalEntry(props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const { user } = useContext(AuthContext);
    const params = useParams();

    const formatDate = (date) => {
        const d = new Date(`${date}T00:00`);
        const options = { month: "short",  year: "numeric", day: "numeric"};
        return new Intl.DateTimeFormat("en-us", options).format(d);

    }

    const buildCarousel = () => {
        return props.values.images.map((img, i) => {
            return (
                <Carousel.Item key={i}>
                    <Card.Img variant="left" className="rounded card--thumbnail align-self-center d-block w-100" src={img.url} />
                    <button type="button" onClick={() => { setShowCarouselModal(!showCarouselModal) }} className="rounded-btn btn-on-image" >
                        <ZoomIn size={20} />
                    </button>
                </Carousel.Item>
            )
        })
    }

    return (
        <>
        <DeleteModal show={showDeleteModal} toggle={() => { setShowDeleteModal(!showDeleteModal) }} delete={props.deleteJournalEntry} />
        <EditModal
            show={showEditModal}
            toggle={() => { setShowEditModal(!showEditModal) }} 
            update={props.updateJournalEntry} 
            entryID={props.entryID} 
            initialValues={props.values} 
        />
        <CarouselModel 
            show={showCarouselModal}
            toggle={() => { setShowCarouselModal(!showCarouselModal) }}
            images={props.values.images}
            place={props.values.place}
        />
        
        <Card className="mt-5">
            <Row className="g-0">
                <Col md={3} lg={2} className="d-flex flex-column"> 
                    <Carousel indicators={false} controls={false} >
                        { buildCarousel() }
                    </Carousel>
                    { user.userID === params.id && <div className="mt-3 d-flex justify-content-center gap-4">
                        <CustomTooltip id="tooltip-edit" placement="top" text="Edit Entry" >
                            <Button className="card--btn" onClick={() => { setShowEditModal(!showEditModal) }}>
                                <PencilSquare />
                            </Button>
                        </CustomTooltip>
                        
                        <CustomTooltip id="tooltip-delete" placement="top" text="Delete Entry" >
                            <Button className="card--btn" onClick={() => { setShowDeleteModal(!showDeleteModal) }}>
                                <Trash />
                            </Button>
                        </CustomTooltip>
                    </div> }
                </Col>
                <Col md={9} lg={10}>
                    <Card.Body className="ps-4">
                        <div className="card--location">
                            <GeoAltFill color="#F55A5A" />
                            <p>{props.values.country.toUpperCase()}</p>
                            <Card.Link href={`https://www.google.com/maps/search/${props.values.place}`} target="_blank" className="ms-4">View on Google Maps</Card.Link>
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