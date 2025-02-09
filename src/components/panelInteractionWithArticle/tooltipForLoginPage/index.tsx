import React, { FC } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { P } from "vitest/dist/chunks/environment.LoooBwUu.js";

type Props = {
  contentBeforeLink: string;
};

export const TooltipForLoginPage: FC<Props> = ({ contentBeforeLink }) => {
  return (
    <div className={styles.tooltip}>
      <Link to="/registration">Зарегистрируйтесь</Link>, {contentBeforeLink}
    </div>
  );
};
