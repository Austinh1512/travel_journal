import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Formik } from "formik"
import * as Yup from "yup"

export default function LoginForm() {
    return (
        <>
            <h1 className="mt-5">Login</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirmed_password: "",
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Please enter an username"),
                    password: Yup.string()
                        .required("Please enter a password")
                })}
                onSubmit={ console.log("Submit") }
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
                        <Form.Text muted>Don't have an account? Sign up <a href="/register">here.</a></Form.Text>
                    </Form>
                )}
            </Formik>
        </>
    )
}