import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logOutApiAuth } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOutApiAuth,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });
  return { logout, isLoading };
}
