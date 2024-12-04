import React, { FC } from "react";
import styles from "../index.module.css";
import { Link } from "react-router-dom";

type Props = {
  title: string | null;
  id?: string;
};

export const Title: FC<Props> = ({ title, id }) => {
  return (
    <>
      {id ? (
        <Link className={styles.title} to={"/article/" + id}>
          <b>{title}</b>
        </Link>
      ) : (
        <div className={styles.title}>
          <b>{title}</b>
        </div>
      )}
    </>
  );
};
