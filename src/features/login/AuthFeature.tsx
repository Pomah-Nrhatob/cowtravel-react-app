import React, { useState } from "react";
import styles from "./AuthFeature.module.css";
import { InputsForLogin } from "./InputsForLogin";
import { useNavigate } from "react-router-dom";

export const AuthFeature = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.window_login}>
      <h1>Войдите</h1>
      <InputsForLogin />
      <p>
        Нет аккаунта?{" "}
        <button type="button" onClick={() => navigate("/registration")}>
          Зарегистрируйтесь
        </button>
      </p>
      <p>
        Забыли пароль?{" "}
        <button type="button" onClick={() => navigate("/forgot-password")}>
          Нажмите для сброса
        </button>
      </p>
    </div>
  );
};
