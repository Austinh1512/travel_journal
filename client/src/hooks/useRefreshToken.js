import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "../api/axios"

export default function useRefreshToken() {
    const { setUser } = useContext(AuthContext);

    const refresh = async () => {
        const res = await axios.get("/auth/refresh", { withCredentials: true });
        setUser(prev => (
            {
                ...prev,
                accessToken: res.data.accessToken
            }
        ));
        return res.data.accessToken;
    }

    return refresh;
}

