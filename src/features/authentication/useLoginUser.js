import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLoginUser() {
  const navigate = useNavigate();
  const queryQlient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("You have been loged in successfully");
      navigate("/dashboard");
      queryQlient.setQueryData(["user"], data.user);
    },
    onError: () => {
      toast.error("Failed to log in, check your email or password");
      navigate("/login");
    },
  });

  return { mutate, isLoading, error };
}
