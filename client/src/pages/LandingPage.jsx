import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Container } from "react-bootstrap"
import { Icon1Circle, Icon2Circle, Icon3Circle } from "react-bootstrap-icons"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"

export default function LandingPage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.accessToken) {
            navigate(`/${user.userID}`);
        }
    }, [user])

    return (
        <>
            <div className="landing-page--img-container">
                <div className="landing-page--img-text">
                    <h1 className="display-1">Travel Journal</h1>
                    <h2 className="display-2">Document your journey.</h2>
                </div>
            </div>

            <Container>
                <div className="landing-page--main w-100 mt-5 d-flex justify-content-center">
                    <Row className="w-100">
                        <Col md={4} className="landing-page--col">
                            <Icon1Circle color="#F55A5A" size={50} />
                            <p>Go on vacation</p>
                        </Col>
                        <Col md={4} className="landing-page--col">
                            <Icon2Circle color='#F55A5A' size={50} />
                            <p>Write about your experience</p>
                        </Col>
                        <Col md={4} className="landing-page--col">
                            <Icon3Circle color="#F55A5A" size={50} />
                            <p>Share with others</p>
                        </Col>
                    </Row>
                </div>
                <h3 className="display-4 text-center mt-5">Try it out now</h3>
                <div className="d-flex justify-content-center mt-5 mb-5 gap-5">
                    <Link to="login"><Button variant="primary" size="lg" className="form--btn">Login</Button></Link>
                    <Link to="register"><Button variant="primary" size="lg" className="form--btn">Register</Button></Link>
                </div>
                

            </Container>

        </>
    )
}