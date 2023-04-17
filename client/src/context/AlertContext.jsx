import { useState, createContext } from "react"

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        type: "",
        message: ""
    });

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            { children }
        </AlertContext.Provider>
    )
}

export default AlertContext;