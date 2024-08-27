import { Navigate } from "react-router-dom";
import useAuth from "./PublicRoutes";

export default function PrivateRoutes({ children }) {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? children : <Navigate to="/" />;
}
