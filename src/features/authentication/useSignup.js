import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success("User have been created successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to sign up, try again");
    },
  });
  return { signUp, isLoading };
}
