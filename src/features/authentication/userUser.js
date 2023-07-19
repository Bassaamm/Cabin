import { useQuery } from "@tanstack/react-query";
import { getExistUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: userAcc,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getExistUser,
  });

  return {
    userAcc,
    isLoading,
    error,
    isAuthenticated: userAcc?.role === "authenticated",
  };
}
