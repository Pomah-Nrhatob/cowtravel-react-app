import React, { useEffect, useState } from "react";
import styles from "./inputs.module.css";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../app/services/usersApi";
import { useNavigate } from "react-router-dom";
import { hasErrorField } from "../../utils/hasErrorfield";
import { ErrorMessage } from "../../components/errorMessage";
import { BarLoader } from "react-spinners";

type Register = {
  email: string;
  password: string;
  name: string;
};

type Props = {
  registerSucces: boolean;
  setRegisterSucces: (succes: boolean) => void;
};

export const InputsForRegistration: React.FC<Props> = ({
  registerSucces,
  setRegisterSucces,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [registerReq, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");

  const onSubmit = async (data: Register) => {
    try {
      const user = await registerReq(data).unwrap();
      if (user) {
        setRegisterSucces(true);
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs_main}>
      <Input
        name="email"
        label=""
        control={control}
        type="email"
        placeholder="email"
      />
      <Input
        name="name"
        label=""
        control={control}
        type="text"
        placeholder="username"
      />
      <Input
        name="password"
        label=""
        control={control}
        type="password"
        placeholder="пароль"
      />
      <Input
        name="password"
        label="повторите пароль"
        control={control}
        type="password"
        placeholder="повторите пароль"
      />
      <ErrorMessage error={error} />
      <button type="submit">
        {isLoading ? <BarLoader color="#A2A2FF" /> : "Зарегистрироваться"}
      </button>
    </form>
  );
};
