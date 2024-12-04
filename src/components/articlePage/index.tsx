import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLazyGetPublishedArticleQuery } from "../../app/services/publishApi";
import { useSelector } from "react-redux";
import { selectArticleInfo } from "../../features/articleSlice";
import { ArticleContainer } from "../articleContainer";
import { MoonLoader } from "react-spinners";

export const ArticlePageContainer = () => {
  const articleId = useLocation().pathname.split("/")[2];
  const [getArticle, { isLoading, isError }] =
    useLazyGetPublishedArticleQuery();
  const articleInfo = useSelector(selectArticleInfo);
  const publishedTravel = articleInfo.publishedTravel;
  const publishedChapters = articleInfo.publishedChapters;
  const countriesParse = publishedTravel.countries?.map((el) => {
    return JSON.parse(el);
  });
  const dateParse = publishedTravel.dateTravel?.map((el) => {
    return JSON.parse(el);
  });

  useEffect(() => {
    try {
      getArticle(articleId).unwrap();
    } catch (error) {}
  }, []);

  return (
    <div>
      {isLoading ? (
        <MoonLoader />
      ) : (
        <ArticleContainer
          imagePath={publishedTravel.imagePath}
          userName={publishedTravel.userName}
          createdAt={publishedTravel.createdAt}
          title={publishedTravel.title}
          countries={countriesParse}
          dateTravel={dateParse}
          userId={publishedTravel.authorId}
          chapters={publishedChapters}
        />
      )}
    </div>
  );
};
