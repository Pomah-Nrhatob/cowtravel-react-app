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
  confirmPassword: string;
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
    watch,
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
        rules={{
          required: "Введите почту",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Введите корректную почту",
          },
        }}
        name="email"
        label=""
        control={control}
        type="email"
        placeholder="email"
      />
      <Input
        rules={{
          required: "Введите свой никнейм",
          minLength: {
            value: 3,
            message: "Никнейм должен иметь не менее 3 символов",
          },
        }}
        name="name"
        label=""
        control={control}
        type="text"
        placeholder="никнейм"
      />
      <Input
        rules={{
          required: "Введите пароль",
          minLength: {
            value: 8,
            message: "Пароль должен иметь не менее 8 символов",
          },
        }}
        name="password"
        label=""
        control={control}
        type="password"
        placeholder="пароль"
      />
      <Input
        rules={{
          required: "Введите пароль еще раз",
          validate: (match: string) => {
            if (watch("password") !== match) {
              return "Введенные пароли не совпадают";
            }
          },
        }}
        name="confirmPassword"
        label=""
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
