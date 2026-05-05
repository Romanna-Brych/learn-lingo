import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/teachers" replace />;
  }

  return children;
};

export default ProtectedRoute;
