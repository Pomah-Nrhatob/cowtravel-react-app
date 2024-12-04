import React from "react";
import styles from "./AuthFeature.module.css";
import { InputForMail } from "./InputForMail";

export const ForgotPasswordContainer = () => {
  return (
    <div className={styles.window_login}>
      <h1>Введите почту аккаунта</h1>
      <InputForMail />
    </div>
  );
};
