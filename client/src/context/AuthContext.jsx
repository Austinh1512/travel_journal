import { createContext, useState } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        accessToken: ""
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;