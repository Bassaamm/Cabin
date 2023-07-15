import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useUpdateSettings() {
  const queryClint = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings have been updated successfully ");
      queryClint.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) =>
      toast.error("Couldn't update the settings, something went wrong"),
  });
  return { isUpdating, update };
}
