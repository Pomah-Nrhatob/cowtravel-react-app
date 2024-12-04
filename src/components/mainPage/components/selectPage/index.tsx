import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PageButton } from "./PageButton";

type Props = {
  countPage: number;
  location: string;
};

export const SelectPage: FC<Props> = ({ countPage, location }) => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<number>(1);
  const [pagesArr, setPagesArr] = useState<any[]>([]);

  const pageNumberToArr = (pageNumber: number): number[] => {
    let arr: number[] = [];
    for (let i = 1; i <= pageNumber; i++) {
      arr.push(i);
    }
    return arr;
  };

  useEffect(() => {
    if (location !== "/") {
      const pageNumber = Number(location.split("page")[1]);
      setPageState(pageNumber);
    } else {
      setPageState(1);
    }
  }, [location]);

  useEffect(() => {
    const pages = Math.ceil(countPage / 10);

    if (pages < 6) {
      setPagesArr(pageNumberToArr(pages));
    } else {
      if (pageState < 4) {
        setPagesArr([1, 2, 3, 4, "...", pages]);
      } else if (pageState > 3 && pageState < pages - 2) {
        setPagesArr([
          1,
          "...",
          pageState - 1,
          pageState,
          pageState + 1,
          "...",
          pages,
        ]);
      } else {
        setPagesArr([1, "...", pages - 2, pages - 1, pages]);
      }
    }
  }, [, countPage, pageState]);

  const toPage = (page) => {
    if (page == 1) {
      navigate(`/`);
    } else {
      navigate(`/page${page}`);
    }
  };

  const toPageUp = (page) => {
    const pages = countPage / 10;
    if (pageState < pages) {
      if (!page) {
        navigate(`/page${pageState + 1}`);
      } else {
        navigate(`/page${page}`);
      }
    } else {
      return null;
    }
  };

  const toPageDown = () => {
    if (pageState == 1) {
      return null;
    }
    if (pageState == 2) {
      navigate("/");
    } else {
      navigate(`/page${pageState - 1}`);
    }
  };

  return (
    <div className={styles.selectPage_main}>
      <BiArrowToLeft
        onClick={() => toPageDown()}
        className={styles.arrows}
        size={"1.5rem"}
      />
      <div className={styles.btn_numbers}>
        {pagesArr.map((page, index) => {
          return (
            <PageButton
              isActive={pageState == page ? true : false}
              toPage={toPage}
              key={index}
              numberPage={page}
            />
          );
        })}
      </div>
      <BiArrowToRight
        onClick={() => toPageUp(0)}
        className={styles.arrows}
        size={"1.5rem"}
      />
    </div>
  );
};
