import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Halaman masuk dan daftar hanya untuk yang belum login.
export default function GuestOnly() {
  const { IsLoggedIn } = useAuth();

  if (IsLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
