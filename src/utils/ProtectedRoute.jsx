import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useContext } from "react";

const IsAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to={"/login"} />;
  return children;
};

export const IsNotAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default IsAuthenticated;
