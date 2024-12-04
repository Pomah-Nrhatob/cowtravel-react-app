import React from "react";
import styles from "./index.module.css";
import { IoMdClose } from "react-icons/io";

type Props = {
  name: string;
  index: number;
  removeTravel: (index: number) => void;
};

export const SelectedCountry: React.FC<Props> = ({
  name,
  removeTravel,
  index,
}) => {
  const handleRemoveTravel = () => {
    removeTravel(index);
  };

  return (
    <div className={styles.selectedCountry_main}>
      <span>{name}</span>
      <IoMdClose
        onClick={handleRemoveTravel}
        style={{ cursor: "pointer", transition: "0.3s" }}
        size="1rem"
        className={styles.btn_delete}
      />
    </div>
  );
};
