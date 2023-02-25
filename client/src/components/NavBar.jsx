import { useContext } from "react"
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { GlobeAmericas } from "react-bootstrap-icons"

export default function NavBar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await axios.get("/auth/logout", { withCredentials: true });
        setUser({
            username: "",
            accessToken: "",
            userID: ""
        });
        navigate("/", { replace: true });
    }

    return (
        <Navbar className="nav">
            <Container className="justify-content-center">
                <Navbar.Brand href="http://localhost:5173" className="d-flex align-items-center gap-2">
                    <GlobeAmericas color="white"/>
                    <span className="fs-6 py-2">My Travel Journal</span>
                </Navbar.Brand>
                <Nav className="ms-auto">
                    { !user.username ? 
                        <>
                            <Nav.Link href="/login" className="nav--button">Login</Nav.Link>
                            <Nav.Link href="/register" className="nav--button">Register</Nav.Link>
                        </>
                         :
                            <Form onSubmit={handleLogout}>
                                <Button type="submit" className="nav--button">Logout</Button>
                            </Form>
                    }
                    
                </Nav>
            </Container>
        </Navbar>
    )
}