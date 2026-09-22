import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getDashboardPathForRole } from "../../store/slices/authSlice";

/**
 * Guards a route subtree behind authentication, and optionally a specific role.
 * Usage: <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}> ... </Route>
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPathForRole(role)} replace />;
  }

  return <Outlet />;
}
