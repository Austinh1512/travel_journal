import { library } from "@fortawesome/fontawesome-svg-core"
import { faEarthAmericas, faLocationDot, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import Container from "react-bootstrap/Container"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"


library.add(faEarthAmericas, faLocationDot, faPenToSquare, faTrash);

export default function App() {
  

  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Container>
    </>
  )
}

