import { useSelector } from "react-redux";
import { ArticleList } from "../mainPage/components/articleList";
import { selectCurrent } from "../../features/userSlice";
import { useEffect, useState } from "react";
import { useLazyGetFavoriteArticleQuery } from "../../app/services/publishedTravelApi";
import styles from "./index.module.css";

export const MyFavoriteArticle = () => {
  const [articleListState, setArticleListState] = useState<string[] | []>([]);
  const userInfo = useSelector(selectCurrent);

  const [getFavoriteArticles] = useLazyGetFavoriteArticleQuery();

  useEffect(() => {
    if (userInfo?.favoriteArticles) {
      (async () => {
        try {
          const articles = await getFavoriteArticles(userInfo.id).unwrap();
          setArticleListState(articles);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <div className={styles.favoriteArticleList}>
      <h1>Избранное</h1>
      {articleListState.length > 0 ? (
        <ArticleList articleList={articleListState} />
      ) : (
        <span>Вы не добавляли статьи в избранное</span>
      )}
    </div>
  );
};
