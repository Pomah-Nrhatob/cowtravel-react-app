import React from "react";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import { EditorTravel } from "../editorTravel";
import { NewTravel } from "../newTravel";

export const EditTravelContainer = () => {
  const location = useLocation().pathname.split("/")[2];

  return (
    <div className={styles.newTravelPage}>
      {location == "new" ? <NewTravel /> : <EditorTravel />}
    </div>
  );
};
