import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../api/axios";

export default function useRefreshToken() {
  const { setUser } = useContext(AuthContext);

  const refresh = async () => {
    const res = await axios.get("/auth/refresh");
    setUser({
      username: res.data.username,
      userID: res.data.userID,
      accessToken: res.data.accessToken,
    });
    return res.data.accessToken;
  };

  return refresh;
}
