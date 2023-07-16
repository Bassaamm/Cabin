import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isLoading: checkinLoading, checkIn } = useCheckIn();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const moveBack = useMoveBack();

  useEffect(
    () => setConfirmPayment(booking?.isPaid ?? false),
    [booking?.isPaid]
  );
  useEffect(
    () => setBreakfast(booking?.hasBreakfast ?? false),
    [booking?.hasBreakfast]
  );

  if (isLoading || settingsLoading) return <Spinner />;
  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const calcBreakfastPrice = settings.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmPayment) return;

    if (breakfast)
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: calcBreakfastPrice,
          totalPrice: calcBreakfastPrice + totalPrice,
        },
      });
    else checkIn({ bookingId, breakfast });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast-booking"
            checked={breakfast}
            onChange={() => {
              setBreakfast(!breakfast);
              setConfirmPayment(false);
            }}
            disabled={booking?.hasBreakfast}
          >
            Breakfast will cost {formatCurrency(calcBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirmation"
          checked={confirmPayment}
          onChange={() => setConfirmPayment(!confirmPayment)}
          disabled={confirmPayment}
        >
          I confirm that guest {guest.fullName} with bookding id #{bookingId}{" "}
          have paid a total price of{" "}
          {breakfast
            ? formatCurrency(totalPrice + calcBreakfastPrice)
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPayment} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
