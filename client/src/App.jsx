import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import PersistLogin from "./components/PersistLogin";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import LoginForm from "./pages/authentication/LoginForm";
import RegisterForm from "./pages/authentication/RegisterForm";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route index element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="entries/:id" element={<Home />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
