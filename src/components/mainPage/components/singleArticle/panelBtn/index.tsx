import React, { FC } from "react";
import styles from "../index.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string | null;
};

export const PanelBtn: FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.panelBtn_main}>
      <button onClick={() => navigate(`/article/${id}`)}>Читать далее</button>
    </div>
  );
};
