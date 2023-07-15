import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAndEditCabin } from "../../services/apiCabines";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClint = useQueryClient();

  const { isLoading: isEditing, mutate: edit } = useMutation({
    mutationFn: ({ newCabin, id }) => insertAndEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin have been edited successfully ");
      queryClint.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (error) =>
      toast.error("Couldn't edited the Cabin, something went wrong"),
  });
  return { isEditing, edit };
}
