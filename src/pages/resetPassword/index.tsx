import React from "react";
import styles from "./index.module.css";
import { Header } from "../../components/header";
import { ResetPasswordContainer } from "../../features/login/ResetPasswordContainer";

export const ResetPasswordPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <ResetPasswordContainer />
    </main>
  );
};
