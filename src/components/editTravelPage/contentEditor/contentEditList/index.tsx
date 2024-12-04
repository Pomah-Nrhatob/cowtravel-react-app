import React, { useEffect, useRef, useState } from "react";
import { SingleEditContent } from "../singleEditContent";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewChapterReducer,
  selectChapters,
} from "../../../../features/chaptersSlice";
import {
  getChapters,
  useLazyGetChaptersQuery,
} from "../../../../app/services/chapterApi";
import { BarLoader } from "react-spinners";
import styles from "./index.module.css";
import { Chapter } from "../../../../app/types";
import { Tooltip, TooltipRefProps } from "react-tooltip";

type Props = {
  travelId: string;
};

export const ContentEditList: React.FC<Props> = ({ travelId }) => {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapters);
  const [getChapters, { isLoading }] = useLazyGetChaptersQuery();
  const [saveNewChapter, setSaveNewChapter] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef1 = useRef<TooltipRefProps>(null);

  const addNewChapter = () => {
    dispatch(addNewChapterReducer(""));
    setShowTooltip(true);
  };

  const handleCheckChapters = () => {
    if (chapters.length > 0) {
      chapters[chapters.length - 1].id == ""
        ? tooltipRef1.current?.open()
        : addNewChapter();
    } else {
      addNewChapter();
    }
  };

  useEffect(() => {
    try {
      getChapters(travelId).unwrap();
    } catch (error) {
      console.log(error);
    }
    setShowTooltip(false);
  }, [saveNewChapter]);

  return (
    <div className={styles.contentEditList_main}>
      {isLoading ? (
        <BarLoader color="#A2A2FF" />
      ) : (
        <div className={styles.contentEditList_li}>
          {chapters.length !== 0 ? (
            chapters.map((el, index) => (
              <SingleEditContent
                arrayIndex={index}
                saveNewChapter={saveNewChapter}
                setSaveNewChapter={setSaveNewChapter}
                travelId={travelId}
                images={el.images}
                key={el.id}
                title={el.title}
                content={el.content}
                id={el.id}
              />
            ))
          ) : (
            <p>Глав пока не добавлено</p>
          )}
          <div>
            <button data-tooltip-id="tooltip1" onClick={handleCheckChapters}>
              Добавить главу
            </button>
            {showTooltip ? (
              <Tooltip
                ref={tooltipRef1}
                data-tooltip-delay-show={20}
                events={["click"]}
                id="tooltip1"
                content="Добавте текст в предыдущую главу, прежде чем создать новую"
                place="right"
                className={styles.tooltip_rounded}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
