import React from "react";
import { ForgotPasswordContainer } from "../../features/login/ForgotPasswordContainer";
import { Header } from "../../components/header";
import styles from "./index.module.css";

export const ForgotPasswordPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <ForgotPasswordContainer />
    </main>
  );
};
