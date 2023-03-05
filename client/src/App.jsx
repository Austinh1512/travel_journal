import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import PersistLogin from "./components/PersistLogin"
import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"
import NotFound from "./pages/NotFound"

export default function App() {
  
  return (
      <Routes>
        <Route element={<PersistLogin />}>
        <Route index element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/:id" element={<Home />} />
          </Route>
        </Route>
        
        <Route element={<Layout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>  
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

