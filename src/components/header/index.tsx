import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { UserProfile } from "./components/userProfile";
import { LoginBtn } from "./components/loginBtn";
import { useNavigate } from "react-router-dom";
import img from "../../../public/icons/icon.png";

export const Header = () => {
  const userInfo = useSelector(selectCurrent);
  const navigate = useNavigate();

  return (
    <header className={styles.header_main}>
      <div onClick={() => navigate("/")} className={styles.icon}>
        <img src={img} alt="icon" />
      </div>
      <div>поиск</div>
      <div className={styles.btn_panel}>
        {userInfo ? <UserProfile userInfo={userInfo} /> : <LoginBtn />}
      </div>
    </header>
  );
};
