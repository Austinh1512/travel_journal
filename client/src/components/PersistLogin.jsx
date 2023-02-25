import { Outlet } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import { useState, useEffect, useContext } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import AuthContext from "../context/AuthContext"

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch(err) {
                console.error(err)
            } finally {
                setIsLoading(false);
            }
        }

        if (!user.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [])



    return (
        <>
            { isLoading
                ? <Oval 
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    color="#F55A5A"
                    secondaryColor="#D3D3D3"
                    visible={isLoading}
                    wrapperClass="centered"
                  />
                : <Outlet />
            }
        </>
    )
}

