import { Container, Navbar } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NavBar() {
    return (
        <Navbar className="nav">
            <Container className="justify-content-center">
                <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon="earth-americas" color="white"/>
                    <span className="fs-6 py-2">My Travel Journal</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}