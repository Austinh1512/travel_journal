import { createContext, useState } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        userID: "",
        accessToken: "",
        error: "",
        success: ""
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;