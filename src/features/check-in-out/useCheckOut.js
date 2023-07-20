import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkOut,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} have been checked out successfully`);
    },
    onError: (data) =>
      toast.error(
        `Booking #${data.id} haven't been checked out successfully, something happend`
      ),
  });
  return { checkOut, isLoading };
}
