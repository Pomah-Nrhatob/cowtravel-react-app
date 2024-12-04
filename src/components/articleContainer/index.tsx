import { FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import { ChapterForArticle } from "./chapterForArticle";
import { Image } from "../../app/types";
import { ImageSlider } from "../../features/imageSlider";
import { Header } from "../mainPage/components/singleArticle/header";
import { Title } from "../mainPage/components/singleArticle/title";
import { ArticleInfo } from "../mainPage/components/singleArticle/articleInfo";
import { Content } from "../mainPage/components/singleArticle/content";

export type Chapter = {
  title: string | null;
  content: string | TrustedHTML;
  chapterId: string | null;
  publishedTravelsId?: string | null;
  images?: Image[] | null;
};

type Props = {
  title: string | null;
  countries: string[] | null | undefined;
  dateTravel: string[] | null | undefined;
  createdAt?: Date | null;
  updateAt?: Date | null;
  userId: string | null;
  chapters: Chapter[] | null;
  userName?: string | null;
  imagePath: string | null | undefined;
};

export const ArticleContainer: React.FC<Props> = ({
  title,
  countries,
  dateTravel,
  createdAt,
  updateAt,
  userId,
  chapters,
  userName,
  imagePath,
}) => {
  const [chaptersState, setChaptersState] = useState<Chapter[] | null>();

  useEffect(() => {
    setChaptersState(chapters);
  }, [chapters]);

  return (
    <div className={styles.article_main}>
      <div className={styles.header_article}>
        <h2>{title}</h2>
        <Header userName={userName} authorId={userId} createdAt={createdAt} />
        <ArticleInfo
          countries={countries?.map((el) => {
            return JSON.stringify(el);
          })}
          dateTravel={dateTravel?.map((el) => {
            return JSON.stringify(el);
          })}
        />
        <Content imagePath={imagePath} />
      </div>
      <div className={styles.chapter_list}>
        {chaptersState?.map((chapter) => {
          return (
            <div className={styles.chapterWithImage} key={chapter.chapterId}>
              <ChapterForArticle chapterInfo={chapter} />
              {chapter.images?.length ? (
                <div className={styles.imageSlider_container}>
                  <ImageSlider
                    showPanelBtn={false}
                    images={chapter.images}
                    chapterId={chapter.chapterId}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
