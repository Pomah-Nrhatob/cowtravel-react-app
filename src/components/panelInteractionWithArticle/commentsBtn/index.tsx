import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import styles from "../index.module.css";

export const CommentsBtn = () => {
  return (
    <div className={styles.btn_main}>
      <FaCommentAlt className={styles.btn} size={"1rem"} />
      <div>
        <span className={styles.span}>{5}</span>
      </div>
    </div>
  );
};
