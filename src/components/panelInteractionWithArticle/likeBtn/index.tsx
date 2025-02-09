import React, { FC, useEffect, useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import styles from "../index.module.css";
import {
  useDeleteLikeArticleMutation,
  useLikeArticleMutation,
} from "../../../app/services/publishedTravelApi";
import { useDispatch } from "react-redux";
import {
  disLikeArticleReducer,
  likeArticleReducer,
} from "../../../features/userSlice";
import { Tooltip } from "react-tooltip";
import { TooltipForLoginPage } from "../tooltipForLoginPage";
import useOutsideAlerter from "../../../utils/useOutsideAlertet";

type Props = {
  rating: number | null;
  isLikeArticles: string[] | undefined;
  userId: number | undefined;
  articleId: string | null;
};

export const LikeBtn: FC<Props> = ({
  rating,
  isLikeArticles,
  userId,
  articleId,
}) => {
  const [likeArticle] = useLikeArticleMutation();
  const [disLikeArticle] = useDeleteLikeArticleMutation();
  const dispatch = useDispatch();

  const [ratingState, setRatingState] = useState<number | null>(0);
  const [activeBtnState, setActiveBtnState] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const clickOutside = useRef(null);

  useEffect(() => {
    setRatingState(rating);
  }, [rating]);

  useEffect(() => {
    if (articleId) {
      if (isLikeArticles?.includes(articleId)) {
        setActiveBtnState(true);
      } else {
        setActiveBtnState(false);
      }
    }
  }, [isLikeArticles]);

  const handleLikeArticle = async () => {
    try {
      activeBtnState
        ? (await disLikeArticle({
            userId,
            publishedTravelId: articleId,
          }).unwrap(),
          setRatingState(ratingState ? ratingState - 1 : 0),
          dispatch(disLikeArticleReducer(articleId)))
        : (await likeArticle({
            userId,
            publishedTravelId: articleId,
          }).unwrap(),
          setRatingState(ratingState ? ratingState + 1 : 1),
          dispatch(likeArticleReducer(articleId)));
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
      <AiFillLike
        onClick={userId ? handleLikeArticle : openTooltip}
        className={activeBtnState ? styles.btn_active : styles.btn}
        size={"1.3rem"}
        data-tooltip-id="tooltip1"
      />
      <div>
        <span className={activeBtnState ? styles.span_active : styles.span}>
          {ratingState}
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
          <TooltipForLoginPage contentBeforeLink="чтобы оценить статью" />
        </div>
      </Tooltip>
    </div>
  );
};
