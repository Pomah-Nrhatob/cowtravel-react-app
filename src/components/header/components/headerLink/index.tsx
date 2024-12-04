import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

type Props = {
  name: string;
  link: string;
};

export const HeaderLink: React.FC<Props> = ({ link, name }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(link)} className={styles.link}>
      {name}
    </button>
  );
};
