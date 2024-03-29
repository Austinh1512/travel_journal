import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomAlert from "../CustomAlert";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Google } from "react-bootstrap-icons";
import useEnvironment from "../../hooks/useEnvironment";

export default function AuthenticationForm({ type }) {
  const [showAlert, setShowAlert] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const handleError = useErrorHandler();
  const env = useEnvironment();
  const navigate = useNavigate();

  const google = () => {
    window.open(`${env}/auth/google`, "_self");
  };

  const loginValidationSchema = Yup.object({
    username: Yup.string().required("Please enter an username"),
    password: Yup.string().required("Please enter a password"),
  });

  const registerValidationSchema = Yup.object({
    username: Yup.string().required("Please enter an username"),
    password: Yup.string().required("Please enter a password"),
    confirmed_password: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const headerText = type[0].toUpperCase() + type.slice(1);

  const FormHelperText = () => {
    return type === "login" ? (
      <Form.Text muted>
        Don't have an account? Sign up <Link to="/register">here.</Link>
      </Form.Text>
    ) : (
      <Form.Text muted>
        Already have an account? Sign in <Link to="/login">here.</Link>
      </Form.Text>
    );
  };

  const handleLogin = async (values) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    try {
      const res = await axios.post("/auth/login", JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
      });
      setUser(res.data);
      setAlert({
        type: "success",
        message: "Successfully logged in!",
      });
      navigate(`/entries/${res.data.userID}`, { replace: true });
    } catch (err) {
      handleError(err);
      setShowAlert(true);
    }
  };

  const handleRegister = async (values) => {
    try {
      const res = await axios.post("/auth/register", JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
      });
      setUser(res.data);
      setAlert({
        type: "success",
        message: "Registration successful!",
      });
      navigate(`/entries/${res.data.userID}`, { replace: true });
    } catch (err) {
      handleError(err);
      setShowAlert(true);
    }
  };

  return (
    <div className="mt-5">
      <h1>{headerText}</h1>
      <CustomAlert show={showAlert} dismiss={() => setShowAlert(false)} />
      <Row>
        <Col md={6} className="border-lg-right border-xs-bottom pe-5 pb-4 mb-3">
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmed_password: "",
            }}
            validationSchema={
              type === "login"
                ? loginValidationSchema
                : registerValidationSchema
            }
            onSubmit={(values) => {
              type === "login" ? handleLogin(values) : handleRegister(values);
            }}
          >
            {(formik) => (
              <Form
                noValidate
                className="mt-4 d-flex flex-column justify-content-center"
                onSubmit={formik.handleSubmit}
              >
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
                    isInvalid={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
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
                    isInvalid={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {type === "register" && (
                  <Form.Group className="mb-3" controlId="confirmed_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      size="lg"
                      name="confirmed_password"
                      value={formik.values.confirmed_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={
                        formik.touched.confirmed_password &&
                        !formik.errors.confirmed_password
                      }
                      isInvalid={
                        formik.touched.confirmed_password &&
                        Boolean(formik.errors.confirmed_password)
                      }
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmed_password}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {FormHelperText()}

                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="form--btn align-self-center mt-3"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Button
            variant="primary"
            size="lg"
            className="form--btn d-flex gap-3 align-items-center"
            onClick={google}
          >
            <Google size={22} />
            <span>Sign in with Google</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
