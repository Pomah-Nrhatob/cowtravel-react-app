import React, { useState } from "react";
import styles from "./inputs.module.css";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import {
  useCurrentQuery,
  useLazyCurrentQuery,
  useLazyForgorPasswordQuery,
  useLazyResetPasswordQuery,
  useLoginMutation,
} from "../../app/services/usersApi";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/errorMessage";
import { hasErrorField } from "../../utils/hasErrorfield";
import { BarLoader } from "react-spinners";

type ResetPassword = {
  password: string;
};

type Props = {
  token: string;
  successReset: boolean;
  setSuccessReset: (state: boolean) => void;
};

export const InputForResetPassword: React.FC<Props> = ({
  token,
  successReset,
  setSuccessReset,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPassword>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  const [resetPassword, { isLoading }] = useLazyResetPasswordQuery();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await resetPassword({ password: data.password, token }).unwrap();
      setSuccessReset(true);
      setError("");
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs_main}>
      <Input
        control={control}
        label=""
        name="password"
        type="password"
        placeholder="Введите пароль"
      />
      <ErrorMessage error={error} />
      <button type="submit">
        {isLoading ? <BarLoader color="#A2A2FF" /> : "Сменить пароль"}
      </button>
    </form>
  );
};
