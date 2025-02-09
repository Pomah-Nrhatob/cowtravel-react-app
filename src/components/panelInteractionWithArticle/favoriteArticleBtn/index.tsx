import React, { FC, useEffect, useRef, useState } from "react";
import { IoBookmarks } from "react-icons/io5";
import styles from "../index.module.css";
import {
  useAddFavoriteArticleMutation,
  useDeleteFavoriteArticleMutation,
} from "../../../app/services/publishedTravelApi";
import { useDispatch } from "react-redux";
import {
  addFavoriteArticleReducer,
  deleteFavoriteArticleReducer,
} from "../../../features/userSlice";
import { Tooltip } from "react-tooltip";
import { TooltipForLoginPage } from "../tooltipForLoginPage";
import useOutsideAlerter from "../../../utils/useOutsideAlertet";

type Props = {
  isFavoriteCount: number | null;
  favoriteArticles: string[] | undefined;
  userId: number | undefined;
  articleId: string | null;
};

export const FavoriteArticleBtn: FC<Props> = ({
  isFavoriteCount,
  favoriteArticles,
  userId,
  articleId,
}) => {
  const [activeBtnState, setActiveBtnState] = useState<boolean>(false);

  const [isFavoriteCountState, setIsFavoriteCountState] = useState<
    number | null
  >(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const clickOutside = useRef(null);

  useEffect(() => {
    if (articleId) {
      if (favoriteArticles?.includes(articleId)) {
        setActiveBtnState(true);
      } else {
        setActiveBtnState(false);
      }
    }
  }, [favoriteArticles]);

  useEffect(() => {
    setIsFavoriteCountState(isFavoriteCount);
  }, [isFavoriteCount]);

  const dispatch = useDispatch();

  const [addFavoriteArticle] = useAddFavoriteArticleMutation();
  const [deleteFavoriteArticle] = useDeleteFavoriteArticleMutation();

  const handleFavoriteArticle = async () => {
    try {
      activeBtnState
        ? (await deleteFavoriteArticle({
            userId,
            publishedTravelId: articleId,
          }).unwrap(),
          setIsFavoriteCountState(
            isFavoriteCountState ? isFavoriteCountState - 1 : 0
          ),
          dispatch(deleteFavoriteArticleReducer(articleId)))
        : (await addFavoriteArticle({
            userId,
            publishedTravelId: articleId,
          }).unwrap(),
          setIsFavoriteCountState(
            isFavoriteCountState ? isFavoriteCountState + 1 : 1
          ),
          dispatch(addFavoriteArticleReducer(articleId)));
    } catch (e) {
      console.log(e);
    }
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const openTooltip = () => {
    setShowTooltip(true);
  };

  useOutsideAlerter(clickOutside, closeTooltip);

  return (
    <div className={styles.btn_main}>
      <IoBookmarks
        onClick={userId ? handleFavoriteArticle : openTooltip}
        className={activeBtnState ? styles.btn_active : styles.btn}
        size={"1rem"}
        data-tooltip-id="tooltip1"
      />
      <div>
        <span className={activeBtnState ? styles.span_active : styles.span}>
          {isFavoriteCountState}
        </span>
      </div>
      <Tooltip
        isOpen={showTooltip}
        id="tooltip1"
        className={styles.tooltip_rounded}
        place="top"
        clickable
      >
        <div ref={clickOutside}>
          <TooltipForLoginPage contentBeforeLink="чтобы добавить статью в избранное" />
        </div>
      </Tooltip>
    </div>
  );
};
