import { FC } from "react";
import styles from "./index.module.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type Props = {
  changeSlide: (direction: number) => void;
};

export const Arrows: FC<Props> = ({ changeSlide }) => {
  return (
    <div className={styles.allows_container}>
      <IoIosArrowDropleft
        style={{ cursor: "pointer" }}
        size={40}
        onClick={() => changeSlide(-1)}
      />
      <IoIosArrowDropright
        style={{ cursor: "pointer" }}
        size={40}
        onClick={() => changeSlide(1)}
      />
    </div>
  );
};
