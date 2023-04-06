import Modal from "react-bootstrap/Modal"
import Carousel from "react-bootstrap/Carousel"

export default function CarouselModal(props) {
    const buildCarousel = () => {
        return props.images.map((img, i) => {
            return (
                <Carousel.Item key={i}>
                    <img src={img.url} />
                </Carousel.Item>
            )
        })
    }

    return (
        <Modal show={props.show} onHide={props.toggle} className="carousel-modal centered" >
            <Modal.Header closeButton>
                <Modal.Title>{props.place}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    { buildCarousel() }
                </Carousel>
            </Modal.Body>
        </Modal>
    )
}