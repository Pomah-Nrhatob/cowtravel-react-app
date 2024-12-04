import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export const LoginBtn = () => {
  const navigate = useNavigate();

  const onClickAuth = () => {
    navigate("/auth");
  };

  const onClickRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className={styles.login_btn}>
      <button className={styles.btn_white} onClick={onClickAuth}>
        Войти
      </button>
      <button onClick={onClickRegistration} className={styles.btn_red}>
        Регистрация
      </button>
    </div>
  );
};
