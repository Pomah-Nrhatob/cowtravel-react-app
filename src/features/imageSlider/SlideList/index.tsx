import { FC } from "react";
import { Image } from "../../../app/types";
import styles from "./index.module.css";
import { Slide } from "./Slide";

type Props = {
  slide: number;
  items: Image[] | null | undefined;
  changeSlide: (direction: number) => void;
  showPanelBtn: boolean;
};

export const SlideList: FC<Props> = ({
  slide,
  items,
  changeSlide,
  showPanelBtn,
}) => {
  return (
    <div
      style={{ transform: `translateX(-${slide * 100}%)` }}
      className={styles.slideList_main}
    >
      {items?.map((el, index) => (
        <Slide
          showPanelBtn={showPanelBtn}
          changeSlide={changeSlide}
          key={index}
          sildeInfo={el}
        />
      ))}
    </div>
  );
};
