import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Halaman di dalam wrapper ini hanya bisa dibuka setelah login.
export default function RequireAuth() {
  const { IsLoggedIn } = useAuth();
  const location = useLocation();

  if (!IsLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, needLogin: true }}
      />
    );
  }

  return <Outlet />;
}
