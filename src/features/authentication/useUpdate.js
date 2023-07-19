import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdate() {
  const queryClint = useQueryClient();

  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success("User data have been updated successfully ");
      queryClint.setQueryData(["user"], data);
    },
    onError: (error) =>
      toast.error("Couldn't update the user, something went wrong"),
  });
  return { isUpdating, update };
}
