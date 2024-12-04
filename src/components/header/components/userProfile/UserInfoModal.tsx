import React, { FC } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

type Props = {
  name: string | undefined;
  id: number | undefined;
  onClickLogout: () => void;
};

export const UserInfoModal: FC<Props> = ({ name, id, onClickLogout }) => {
  return (
    <div className={styles.userInfoModal_main}>
      <Link to={`/user/${id}`}>@{name}</Link>
      <button onClick={onClickLogout}>Выйти</button>
    </div>
  );
};
