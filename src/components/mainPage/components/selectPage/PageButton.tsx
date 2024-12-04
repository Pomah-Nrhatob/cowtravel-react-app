import React, { FC } from "react";
import styles from "./index.module.css";

type Props = {
  numberPage: number;
  toPage: (page: number) => void;
  isActive: boolean;
};

export const PageButton: FC<Props> = ({ numberPage, toPage, isActive }) => {
  return (
    <>
      <button
        onClick={() => {
          isActive ? "" : toPage(numberPage);
        }}
        className={isActive ? styles.active : styles.deActive}
      >
        {numberPage}
      </button>
    </>
  );
};
