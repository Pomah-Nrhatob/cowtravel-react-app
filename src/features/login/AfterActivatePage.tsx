import React from "react";
import styles from "./AuthFeature.module.css";
import { InputsForLogin } from "./InputsForLogin";

export const AfterActivatePage = () => {
  return (
    <div className={styles.window_login}>
      <h2>Аккаунт подтвержден</h2>
      <h1>Войдите</h1>
      <InputsForLogin />
    </div>
  );
};
