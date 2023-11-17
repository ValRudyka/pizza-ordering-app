import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserInfo } from "../features/user/userSlice";

function ProtectedRoute() {
  const { username } = useSelector(selectUserInfo);

  return username ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
