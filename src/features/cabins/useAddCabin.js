import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAndEditCabin } from "../../services/apiCabines";
import { toast } from "react-hot-toast";

export function useAddCabin() {
  const queryClint = useQueryClient();
  const { isLoading: isAdding, mutate: add } = useMutation({
    mutationFn: insertAndEditCabin,
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["cabin"] });
    },
  });
  return { isAdding, add };
}
