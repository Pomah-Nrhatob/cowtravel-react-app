import React, { FC } from "react";
import styles from "../index.module.css";
import { BASE_URL } from "../../../../../constants";

type Props = {
  imagePath: string | null | undefined;
};

export const Content: FC<Props> = ({ imagePath }) => {
  return (
    <div className={styles.content_main}>
      {imagePath ? (
        <div className={styles.image}>
          <img src={BASE_URL + "/" + imagePath} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
