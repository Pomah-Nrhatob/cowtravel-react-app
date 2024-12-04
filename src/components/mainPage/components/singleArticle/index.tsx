import React, { FC } from "react";
import styles from "./index.module.css";
import { Header } from "./header";
import { Title } from "./title";
import { ArticleInfo } from "./articleInfo";
import { Content } from "./content";
import { PanelBtn } from "./panelBtn";
import { ImageForMainPage } from "../../../../app/types";

type Props = {
  id: string;
  title: string;
  countries: string[] | null;
  dateTravel: string[];
  authorId: string;
  userName: string;
  createdAt: Date;
  updateAt: Date;
  imagePath: string | null;
};

export const SingleArticle: FC<Props> = ({
  id,
  title,
  countries,
  dateTravel,
  authorId,
  userName,
  createdAt,
  updateAt,
  imagePath,
}) => {
  return (
    <div className={styles.singleArticle_main}>
      <div className={styles.singleArticle_containter}>
        <Header
          id={id}
          authorId={authorId}
          userName={userName}
          createdAt={createdAt}
        />
        <Title id={id} title={title} />
        <ArticleInfo countries={countries} dateTravel={dateTravel} />
        <Content imagePath={imagePath} />
        <PanelBtn id={id} />
      </div>
    </div>
  );
};
