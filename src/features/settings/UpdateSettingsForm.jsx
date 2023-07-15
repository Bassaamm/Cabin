import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, data, error } = useSettings();

  const {
    id,
    breakfastPrice,
    maxBookingLen,
    minBookingLen,
    maxNumGuestsBooks,
  } = data ? data : {};

  const { isUpdating, update } = useUpdateSettings();

  function handleUpdate(e, data) {
    const { value } = e.target;
    update({ [data]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLen}
          onBlur={(e) => handleUpdate(e, "minBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLen}
          onBlur={(e) => handleUpdate(e, "maxBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxNumGuestsBooks}
          onBlur={(e) => handleUpdate(e, "maxNumGuestsBooks")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
