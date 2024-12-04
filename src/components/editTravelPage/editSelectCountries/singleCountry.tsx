import React from "react";
import styles from "./index.module.css";

type Props = {
  name: string;
  addTravel?: (name: string) => void;
};

export const SingleCountry: React.FC<Props> = ({ name, addTravel }) => {
  return (
    <li onClick={() => addTravel!(name)} className={styles.singleCountry_li}>
      {name}
    </li>
  );
};
