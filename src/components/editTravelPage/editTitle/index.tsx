import React from "react";
import styles from "./index.module.css";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  placeholder: string;
  control: Control<any>;
  required?: string;
};

export const EditTitle: React.FC<Props> = ({
  name,
  placeholder,
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
      <textarea
        className={styles.editTravel_textarea}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value || ""}
        name={field.name}
        id={name}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};
