import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} have been checked in successfully`);
      navigate("/");
    },
    onError: (data) =>
      toast.error(
        `Booking #${data.id} haven't been checked in successfully, something happend`
      ),
  });
  return { checkIn, isLoading };
}
