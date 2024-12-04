import React from "react";
import styles from "./index.module.css";
import { useController } from "react-hook-form";

export const InputForm = ({ name, control, required = "" }) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <>
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value || ""}
        name={field.name}
        id={name}
        placeholder="Введите описание фото"
      />
    </>
  );
};
