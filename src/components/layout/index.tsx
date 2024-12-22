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

export const Layout = () => {
  const isAuthenticated = useSelector(selectisAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <Header />
      <Container>
        <div className={styles.left}></div>
        <div className={styles.center}>
          <Outlet />
        </div>
        <div className={styles.right}></div>
      </Container>
    </div>
  );
};
