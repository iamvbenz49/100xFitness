import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const IsLoggedInRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (authContext?.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default IsLoggedInRoute;
