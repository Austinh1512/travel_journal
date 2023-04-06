import { useContext, useEffect, useState } from "react"
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap"
import AuthContext from "../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../api/axios"
import { GlobeAmericas, Share } from "react-bootstrap-icons"
import ShareModal from "./modals/ShareModal"
import useErrorHandler from "../hooks/useErrorHandler"

export default function NavBar() {
    const [navHeaderText, setNavHeaderText] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const handleError = useErrorHandler();

    const handleShare = () => {
        setShowShareModal(!showShareModal);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/auth/logout", { withCredentials: true });
            setUser({
                username: "",
                accessToken: "",
                userID: "",
                error: "",
                success: ""
            });
            navigate("/", { replace: true });
        } catch(err) {
            handleError(err);
            navigate(`/entries/${user.userID}`);
        }
    }

    useEffect(() => {
        (async () => {
            if (user.userID === params.id || !params.id) {
                setNavHeaderText("My Travel Journal");
            }
            else {
                const res = await axios.get(`/auth/${params.id}`);
                setNavHeaderText(`${res.data.username}'s Travel Journal`);
            }
        })()
    }, [user])

    return (
        <>
            <ShareModal show={showShareModal} toggle={() => setShowShareModal(!showShareModal)} />
            <Navbar className="nav">
                <Container className="justify-content-center">
                    <Navbar.Brand href={`/entries/${user.userID}`} className="d-flex align-items-center gap-2">
                        <GlobeAmericas color="white"/>
                        <span className="fs-6 py-2">{ navHeaderText }</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        { !user.username ? 
                            <>
                                <Nav.Link href="/login" className="nav--button">Login</Nav.Link>
                                <Nav.Link href="/register" className="nav--button">Register</Nav.Link>
                            </>
                            :
                                <div className="d-flex align-items-center gap-3">
                                    { user.userID === params.id && <Share color="white" onClick={handleShare} className="clickable" /> }
                                    <Form onSubmit={handleLogout}>
                                        <Button type="submit" className="nav--button">Logout</Button>
                                    </Form>
                                </div>
                                
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
        
    )
}