import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string | null | undefined;
};

export const HeaderEditTravelsPage: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const navigateTo = (): void => {
    navigate("/edittravels/new");
  };

  return (
    <div className={styles.header}>
      <pre>{name}</pre>
      <button onClick={() => navigateTo()}>Добавить статью</button>
    </div>
  );
};
