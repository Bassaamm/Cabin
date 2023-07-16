import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function usedropBooking() {
  const queryClint = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: dropBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Have been deleted successfully ");
      queryClint.invalidateQueries({ queryKey: ["Booking"] });
      navigate("/Bookings");
    },
    onError: () => toast.error("Couldn't delete something happend"),
  });
  return { isLoading, dropBooking };
}
