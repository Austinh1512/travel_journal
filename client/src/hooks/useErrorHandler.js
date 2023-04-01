import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function useErrorHandler() {
    const { setUser } = useContext(AuthContext);

    const handleError = (err) => {
        const { response } = err;
        setUser(prev => ({
            ...prev,
            error: response.data.error
        }))
    }

    return handleError;
}