import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../util/useAuth";

function PublicRoutes() {
  const token = useAuth();
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
