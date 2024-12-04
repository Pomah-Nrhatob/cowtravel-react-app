import React from "react";
import styles from "./index.module.css";
import { TravelList } from "../travelList";
import { HeaderEditTravelsPage } from "../headerEditTravelsPage";

type Props = {
  name: string;
};

export const EditTravelsContainer: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.editTravels_main}>
      <HeaderEditTravelsPage name={name} />
      <TravelList />
    </div>
  );
};
