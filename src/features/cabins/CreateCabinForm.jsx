import styled from "styled-components";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FileInput from "../../ui/FileInput";
import { useAddCabin } from "./useAddCabin";
import { useEditCabin } from "./useEditCabin";
import { toast } from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinForEdit = {}, closeModal }) {
  const { id: IdEdit, ...editValues } = cabinForEdit;
  const isIdEdit = Boolean(IdEdit);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isIdEdit ? editValues : {},
  });
  const { errors } = formState;
  const { isAdding, add } = useAddCabin();
  const { isEditing, edit } = useEditCabin();
  const isLoading = isEditing && isAdding;

  function onSubmit(CabinData) {
    const image =
      typeof CabinData.image === "string"
        ? CabinData.image
        : CabinData.image[0];

    if (isIdEdit)
      edit(
        { newCabin: { ...CabinData, image }, id: IdEdit },
        {
          onSuccess: (data) => {
            closeModal?.(), reset();
          },
          onError: () => {
            closeModal?.(), reset();
          },
        }
      );
    else
      add(
        { ...CabinData, image },
        {
          onSuccess: () => {
            toast.success("Cabin have been added successfully ");

            closeModal?.(), reset();
          },
          onError: () => {
            toast.error("Couldn't add the Cabin, something went wrong"),
              closeModal?.(),
              reset();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          disabled={isLoading}
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be 1 or more" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", { required: "This field is required" })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              value <= getValues().regularPrice ||
                "The discount shouls be less than the regularPrice";
            },
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          disabled={isLoading}
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            required: isIdEdit ? false : "This field is required",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Clear
        </Button>
        <Button disabled={isLoading}>
          {isIdEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
