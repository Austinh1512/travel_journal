import { useContext } from "react"
import AlertContext from "../context/AlertContext"

export default function useErrorHandler() {
    const { setAlert } = useContext(AlertContext);

    const handleError = (err) => {
        const { response } = err;
        setAlert({
            type: "error",
            message: response?.data?.error
        });
    }

    return handleError;
}