import { library } from "@fortawesome/fontawesome-svg-core"
import { faEarthAmericas, faLocationDot, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"


library.add(faEarthAmericas, faLocationDot, faPenToSquare, faTrash);

export default function App() {
  

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
        </Routes>
    </>
  )
}

