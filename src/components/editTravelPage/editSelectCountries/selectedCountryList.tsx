import React from "react";
import { SelectedCountry } from "./selectedCountry";
import styles from "./index.module.css";

type Props = {
  fields: { id: string; name: string }[];
  removeTravel: (index: number) => void;
};

export const SelectedCountryList: React.FC<Props> = ({
  fields,
  removeTravel,
}) => {
  return (
    <div className={styles.selectedCountry_list}>
      {fields.map((el, index) => (
        <SelectedCountry
          removeTravel={removeTravel}
          index={index}
          key={el.id}
          name={el.name}
        />
      ))}
    </div>
  );
};
