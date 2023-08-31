import { Outlet, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/AuthContext";
import useErrorHandler from "../hooks/useErrorHandler";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        handleError(err);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (!user.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          color="#F55A5A"
          secondaryColor="#D3D3D3"
          visible={isLoading}
          wrapperClass="centered"
        />
      ) : (
        <Outlet />
      )}
    </>
  );
}
