import React, { useState } from "react";
import styles from "./AuthFeature.module.css";
import { InputsForRegistration } from "./InputsForRegistration";
import { useNavigate } from "react-router-dom";

export const RegistrationFeature = () => {
  const navigate = useNavigate();
  const [registerSucces, setRegisterSucces] = useState(false);

  return (
    <div className={styles.window_login}>
      {registerSucces ? (
        <div className={styles.succesInfo}>
          <h2 className={styles.h2}>Вы успешно зарегистрированы</h2>
          <p className={styles.p}>
            На почту отправлена ссылка для подтверждения, подтвердите,
            пожалуйста, свою учетную запись
          </p>
          <button type="button" onClick={() => navigate("/auth")}>
            Войдите
          </button>
        </div>
      ) : (
        <>
          <h1>Зарегистрируйтесь</h1>
          <InputsForRegistration
            registerSucces={registerSucces}
            setRegisterSucces={setRegisterSucces}
          />
          <p>
            Уже есть аккаунт?{" "}
            <button type="button" onClick={() => navigate("/auth")}>
              Войдите
            </button>
          </p>
        </>
      )}
    </div>
  );
};
