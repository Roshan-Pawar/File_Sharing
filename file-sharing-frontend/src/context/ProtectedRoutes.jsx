import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user} = useContext(AuthContext);


  if (!user) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/" />;
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
