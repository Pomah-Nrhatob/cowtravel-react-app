import React, { FC } from "react";
import styles from "./index.module.css";
import { LikeBtn } from "./likeBtn";
import { FavoriteArticleBtn } from "./favoriteArticleBtn";
import { CommentsBtn } from "./commentsBtn";
import { ViewCountBtn } from "./viewCountBtn";
import { useSelector } from "react-redux";
import { selectCurrent, selectUser } from "../../features/userSlice";

type Props = {
  isFavoriteCount: number | null;
  rating: number | null;
  viewCount: number | null;
  articleId: string | null;
};

export const PanelInteractionWithArticle: FC<Props> = ({
  isFavoriteCount,
  rating,
  viewCount,
  articleId,
}) => {
  const userInfo = useSelector(selectCurrent);

  return (
    <div className={styles.panel_main}>
      <LikeBtn
        articleId={articleId}
        userId={userInfo?.id}
        isLikeArticles={userInfo?.isLikeArticles}
        rating={rating}
      />
      <FavoriteArticleBtn
        articleId={articleId}
        userId={userInfo?.id}
        favoriteArticles={userInfo?.favoriteArticles}
        isFavoriteCount={isFavoriteCount}
      />
      {/* <CommentsBtn /> */}
      <ViewCountBtn viewCount={viewCount} />
    </div>
  );
};
