import React, { FC } from "react";
import styles from "./index.module.css";

export type Props = {
  progress: number;
};

export const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className={styles.containerStyles}>
      <div style={{ width: progress }} className={styles.fillerStyles}></div>
    </div>
  );
};
