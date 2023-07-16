import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterStatus = searchParams.get("status");
  const filter =
    !filterStatus || filterStatus === "all"
      ? null
      : { field: "status", value: filterStatus };
  /////////////////////////////////////////////////////////

  //Sorting
  const filterSortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, order] = filterSortBy.split("-");
  const sortBy = { field, order };
  ///////////////////////
  ///pagetion
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });

  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
  });
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page - 1],
    queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
  });
  console.log(data);
  return { data, isLoading, error };
}
