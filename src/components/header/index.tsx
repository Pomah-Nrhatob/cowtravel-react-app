import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { UserProfile } from "./components/userProfile";
import { LoginBtn } from "./components/loginBtn";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const userInfo = useSelector(selectCurrent);
  const navigate = useNavigate();

  return (
    <header className={styles.header_main}>
      <div onClick={() => navigate("/")} className={styles.icon}>
        <img src="../../../public/icons/icon.png" />
        иконка
      </div>
      <div></div>
      <div className={styles.btn_panel}>
        {userInfo ? <UserProfile userInfo={userInfo} /> : <LoginBtn />}
      </div>
    </header>
  );
};
