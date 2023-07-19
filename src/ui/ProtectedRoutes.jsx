import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/userUser";
import Spinner from "./Spinner";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { userAcc, isLoading, error, isAuthenticated } = useUser();
  if (isLoading) return <Spinner />;

  if (!isAuthenticated && !isLoading) return navigate("/login");
  if (isAuthenticated) return children;
}
