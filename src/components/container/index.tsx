import React from "react";
import styles from "./index.module.css";
import { FaChevronCircleUp } from "react-icons/fa";

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <div className={styles.container_main}>{children}</div>;
};
