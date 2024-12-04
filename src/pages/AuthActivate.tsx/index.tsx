import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { AfterActivatePage } from "../../features/login/AfterActivatePage";
import { Header } from "../../components/header";

export const AuthActivate = () => {
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
      <AfterActivatePage />
    </main>
  );
};
