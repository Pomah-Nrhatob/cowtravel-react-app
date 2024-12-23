import { FC, useEffect, useState } from "react";
import { useLazyGetImagesQuery } from "../../app/services/imageApi";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { Image } from "../../app/types";
import { BarLoader } from "react-spinners";
import { BASE_URL } from "../../constants";
import { Arrows } from "./Arrows";
import { SlideList } from "./SlideList";

type Props = {
  chapterId: string | null;
  images: Image[] | null | undefined;
  showPanelBtn: boolean;
};

export const ImageSlider: FC<Props> = ({ chapterId, images, showPanelBtn }) => {
  const [items, setItems] = useState<Image[] | null | undefined>([]);
  const [slide, setSlide] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState(null);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items ? items?.length - 1 : 0;
    } else {
      slideNumber = items ? (slide + direction) % items?.length : 0;
    }
    setSlide(slideNumber);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    setItems(images);
  }, [images]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={styles.imageSlider_main}
    >
      {images?.length ? (
        <div className={styles.slider}>
          <Arrows changeSlide={changeSlide} />
          <SlideList
            showPanelBtn={showPanelBtn}
            changeSlide={changeSlide}
            slide={slide}
            items={items}
          />
        </div>
      ) : (
        <span>Фотографии пока не добавлены</span>
      )}
    </div>
  );
};
