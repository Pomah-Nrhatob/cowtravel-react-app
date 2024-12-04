import React from "react";
import { ContentEditList } from "./contentEditList";
import styles from "./index.module.css";

type Props = {
  travelId: string;
};

export const ContentEditor: React.FC<Props> = ({ travelId }) => {
  return (
    <div className={styles.contentEditor_main}>
      <ContentEditList travelId={travelId} />
    </div>
  );
};
