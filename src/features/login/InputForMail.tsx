import React, { useState } from "react";
import styles from "./inputs.module.css";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import {
  useCurrentQuery,
  useLazyCurrentQuery,
  useLazyForgorPasswordQuery,
  useLoginMutation,
} from "../../app/services/usersApi";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/errorMessage";
import { hasErrorField } from "../../utils/hasErrorfield";
import { BarLoader } from "react-spinners";

type ResetPassword = {
  email: string;
};

export const InputForMail: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPassword>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, { isLoading }] = useLazyForgorPasswordQuery();

  const [error, setError] = useState("");
  const [successReset, setSuccessReset] = useState<boolean>(false);

  const onSubmit = async (data: ResetPassword) => {
    try {
      await forgotPassword(data).unwrap();
      setSuccessReset(true);
      setError("");
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message);
      }
    }
  };

  return (
    <>
      {successReset ? (
        <span className={styles.success_span}>
          Перейдите по ссылке, отправленной вам на почту для смены пароля
        </span>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs_main}>
          <Input
            control={control}
            label=""
            name="email"
            type="email"
            placeholder="Введите почту"
          />
          <ErrorMessage error={error} />
          <button type="submit">
            {isLoading ? <BarLoader color="#A2A2FF" /> : "Сменить пароль"}
          </button>
        </form>
      )}
    </>
  );
};
