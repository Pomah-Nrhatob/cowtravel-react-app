import React, { Children, useContext, useEffect } from "react";
import { Header } from "../header";
import { Container } from "../container";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { selectisAuthenticated, selectUser } from "../../features/userSlice";
import {
  useLazyCurrentQuery,
  useLazyRefreshQuery,
  useRefreshQuery,
} from "../../app/services/usersApi";
import { FaChevronCircleUp } from "react-icons/fa";

export const Layout = () => {
  const isAuthenticated = useSelector(selectisAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleScrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.layout}>
      <Header />
      <Container>
        <div className={styles.left}></div>
        <div className={styles.center}>
          <Outlet />
        </div>
        <div className={styles.right}>
          <FaChevronCircleUp
            onClick={handleScrollUp}
            className={styles.btn_up}
          />
        </div>
      </Container>
    </div>
  );
};
