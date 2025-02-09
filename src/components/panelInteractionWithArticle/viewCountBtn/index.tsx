import React, { FC } from "react";
import { FaRegEye } from "react-icons/fa";
import styles from "../index.module.css";

type Props = {
  viewCount: number | null;
};

export const ViewCountBtn: FC<Props> = ({ viewCount }) => {
  return (
    <div className={styles.btn_main}>
      <FaRegEye className={styles.btn_view} size={"1.1rem"} />
      <div>
        <span className={styles.span}>{viewCount}</span>
      </div>
    </div>
  );
};
