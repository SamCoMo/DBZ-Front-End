import { Navigate, Outlet } from "react-router-dom";
import useUserState from "./hooks/useUserState";

const ProtectedRoute = () => {
  const { userState } = useUserState();
  return userState.isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
