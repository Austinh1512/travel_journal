import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import CustomAlert from "../components/CustomAlert"
import { Formik } from "formik"
import * as Yup from "yup"
import axios from "../api/axios"
import AuthContext from "../context/AuthContext"
import AlertContext from "../context/AlertContext"
import useErrorHandler from "../hooks/useErrorHandler"

export default function LoginForm() {
    const [showAlert, setShowAlert] = useState(false);
    const { setUser } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const handleError = useErrorHandler();
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column">
            <h1 className="mt-5">Login</h1>
            <CustomAlert show={showAlert} dismiss={() => setShowAlert(false)} />
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Please enter an username"),
                    password: Yup.string()
                        .required("Please enter a password")
                })}
                onSubmit={ async (values) => {
                    try {
                        const res = await axios.post("/auth/login", JSON.stringify(values), { headers: { "Content-Type": "application/json" } });
                        setUser(res.data);
                        setAlert({
                            type: "success",
                            message: "Successfully logged in!"
                        });
                        navigate(`/entries/${res.data.userID}`, { replace: true });
                    } catch (err) {
                        handleError(err);
                        setShowAlert(true);
                    }
                } }
            >
                { formik => (
                    <Form noValidate className='mt-4 d-flex flex-column justify-content-center' onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Ex: john_doe123"
                                isValid={formik.touched.username && !formik.errors.username}
                                isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                            />
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                size="lg"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isValid={formik.touched.password && !formik.errors.password}
                                isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                            />
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Text muted>Don't have an account? Sign up <Link to="/register">here.</Link></Form.Text>

                        <Button variant="primary" type="submit" size="lg" className='form--btn align-self-center'>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}