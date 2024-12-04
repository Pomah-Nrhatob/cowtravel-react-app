import React, { useState } from "react";
import styles from "./AuthFeature.module.css";
import styles_ from "./inputs.module.css";
import { InputForMail } from "./InputForMail";
import { useLocation, useNavigate } from "react-router-dom";
import { InputForResetPassword } from "./InputForResetPassword";

export const ResetPasswordContainer = () => {
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  const [successReset, setSuccessReset] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      {successReset ? (
        <div className={styles.window_login}>
          <span className={styles_.success_span}>Пароль успешно изменен</span>
          <button type="button" onClick={() => navigate("/auth")}>
            Перейти в форму входа
          </button>
        </div>
      ) : (
        <div className={styles.window_login}>
          <h1>Введите новый пароль</h1>
          <InputForResetPassword
            successReset={successReset}
            setSuccessReset={setSuccessReset}
            token={token}
          />
        </div>
      )}
    </>
  );
};
