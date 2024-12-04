import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { AuthFeature } from "../../features/login/AuthFeature";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";

export const Auth = () => {
  const userInfo = useSelector(selectCurrent);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <main className={styles.page}>
      <Header />
      <AuthFeature />
    </main>
  );
};
