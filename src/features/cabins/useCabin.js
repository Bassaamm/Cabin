import { useQuery } from "@tanstack/react-query";
import { getCabiens } from "../../services/apiCabines";

export function useCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabiens,
  });
  return { cabins, isLoading, error };
}
