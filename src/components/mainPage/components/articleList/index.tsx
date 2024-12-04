import React, { FC } from "react";
import { SingleArticle } from "../singleArticle";
import styles from "./index.module.css";

type Props = {
  articleList: any[];
};

export const ArticleList: FC<Props> = ({ articleList }) => {
  return (
    <div className={styles.articleList_main}>
      {articleList.map((article, index) => {
        return (
          <SingleArticle
            dateTravel={article.dateTravel}
            authorId={article.authorId}
            userName={article.userName}
            createdAt={article.createdAt}
            updateAt={article.updateAt}
            id={article.id}
            title={article.title}
            countries={article.countries}
            imagePath={article.imagePath}
            key={index}
          />
        );
      })}
    </div>
  );
};
