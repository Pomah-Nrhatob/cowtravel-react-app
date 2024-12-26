import { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Chapter } from "..";

type Props = {
  chapters: Chapter[] | null | undefined;
  handleScroll: (i: number) => void;
};

export const TableOfContents: FC<Props> = ({ chapters, handleScroll }) => {
  return (
    <div className={styles.tableOfContents_main}>
      <h1>Содержание</h1>
      <div className={styles.chaptersList}>
        {chapters?.map((el, index) => {
          return (
            <button onClick={() => handleScroll(index)} key={index}>
              {el.title || <i>б/н</i>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
