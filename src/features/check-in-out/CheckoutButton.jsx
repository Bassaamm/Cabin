import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";
function CheckoutButton({ bookingId }) {
  const { checkOut, isLoading } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
