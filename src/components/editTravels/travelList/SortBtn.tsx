import React, { FC } from "react";
import styles from "./index.module.css";

type Props = {
  title: string;
  name: string;
  viewState: string;
  setViewState: (state: string) => void;
};

export const SortBtn: FC<Props> = ({
  title,
  name,
  viewState,
  setViewState,
}) => {
  const handleSort = () => {
    setViewState(name);
  };

  return (
    <>
      <button
        onClick={handleSort}
        className={
          name == viewState
            ? styles.sort_singleBtn_active
            : styles.sort_singleBtn_deActive
        }
      >
        {title}
      </button>
    </>
  );
};
