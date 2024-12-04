import { useEffect, useState } from "react";
import { Chapter } from "..";
import styles from "./index.module.css";
import { convertToHTML } from "draft-convert";
import { ImageSlider } from "../../../features/imageSlider";
import { Image } from "../../../app/types";

type Props = {
  chapterInfo: Chapter;
};

export const ChapterForArticle: React.FC<Props> = ({ chapterInfo }) => {
  const [content, setContent] = useState<string | TrustedHTML>("");

  useEffect(() => {
    setContent(chapterInfo.content);
  }, [chapterInfo]);

  return (
    <div className={styles.chapter_main}>
      <h2>{chapterInfo?.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
