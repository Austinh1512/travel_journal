import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import AlertContext from "../context/AlertContext";

export default function CustomAlert(props) {
    const { alert, setAlert } = useContext(AlertContext);

    const handleClose = () => {
        props.dismiss();
        setAlert({
            type: "",
            message: ""
        });
    }

    return (
        <Alert variant={alert.type === "success" ? "success" : "danger"} show={props.show} onClose={handleClose} dismissible className="mt-3 align-self-center" >
              <div className="d-flex justify-content-center align-items-center" >
                <p>{ alert.message }</p>
              </div>
          </Alert>
    )
}