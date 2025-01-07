import React, { useState } from "react";
import styles from "./inputs.module.css";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import {
  useCurrentQuery,
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/usersApi";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/errorMessage";
import { hasErrorField } from "../../utils/hasErrorfield";
import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

type Login = {
  email: string;
  password: string;
};

export const InputsForLogin: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [errorState, setError] = useState("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      setError("");
      navigate("/");
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
        name="email"
        type="email"
        placeholder="email"
      />
      <Input
        label=""
        name="password"
        control={control}
        type="password"
        placeholder="пароль"
      />
      <ErrorMessage error={errorState} />
      <button type="submit">
        {isLoading ? <BarLoader color="#A2A2FF" /> : "Войти"}
      </button>
    </form>
  );
};
