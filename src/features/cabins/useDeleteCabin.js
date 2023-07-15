import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabins } from "../../services/apiCabines";

export function useDeleteCabin() {
  const queryClint = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Have been deleted successfully ");
      queryClint.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (error) => toast.error("Can't delete something happend"),
  });
  return { isLoading, mutate };
}
