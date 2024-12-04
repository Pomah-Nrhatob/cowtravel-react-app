import React from "react";
import styles from "./index.module.css";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  control: Control<any>;
  required?: string;
};

export const Input: React.FC<Props> = ({
  name,
  type,
  placeholder,
  label,
  control,
  required = "",
}) => {
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
      <label>{label}</label>
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        id={name}
        className={styles.input_main}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};
