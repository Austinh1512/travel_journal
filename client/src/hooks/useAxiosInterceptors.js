import useRefreshToken from "./useRefreshToken";
import { useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";

export default function useAxiosInterceptors () {
    const refresh = useRefreshToken();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            }, (err) => Promise.reject(err)
        )

        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err.config;
                //If response is an error due to invalid token, retreive new token and resend request
                if ((err.response.status === 403 || err.response.status === 401) && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const accessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(prevRequest);
                }
                return Promise.reject(err);
            }
        )
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [user, refresh]);

    return axios;
} 