import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import CookieService from "../../services/CookieService";

interface IProps {
  redirectPath: string;
  children: ReactNode;
  isLoginPage?: boolean;
}

const ProtectedRoute = ({
  redirectPath,
  children,
  isLoginPage = false,
}: IProps) => {
  const token = CookieService.get("jwt");

  // For login page
  if (isLoginPage && token) {
    return <Navigate to={redirectPath} replace />;
  }

  // For dashboard page
  if (!isLoginPage && !token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
