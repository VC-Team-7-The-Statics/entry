import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
