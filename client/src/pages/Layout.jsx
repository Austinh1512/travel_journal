import { Outlet } from "react-router-dom"
import Container from "react-bootstrap/Container"
import NavBar from "../components/NavBar"

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
    
}
