import React, { FC } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

type Props = {
  name: string | undefined;
  id: number | undefined;
  onClickLogout: () => void;
};

export const UserInfoModal: FC<Props> = ({ name, id, onClickLogout }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.userInfoModal_main}>
      <Link to={`/user/${id}`}>@{name}</Link>
      <hr className={styles.line} />
      <button onClick={() => navigate("/user/favoriteArticle")}>
        Избранное
      </button>
      <hr className={styles.line} />
      <button onClick={onClickLogout}>
        <IoExitOutline color="gray" size={"1.5rem"} />
        Выйти
      </button>
    </div>
  );
};
