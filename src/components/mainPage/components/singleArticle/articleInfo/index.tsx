import React, { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { json } from "stream/consumers";
import { BsCalendarDate } from "react-icons/bs";
import moment from "moment";

type Props = {
  countries: string[] | null | undefined;
  dateTravel: string[] | null | undefined;
};

export const ArticleInfo: FC<Props> = ({ countries, dateTravel }) => {
  const countriesArr = countries?.map((el) => JSON.parse(el));

  const dateArr = dateTravel?.map((el) => JSON.parse(el));

  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    if (dateArr) {
      if (dateArr[0].name !== null) {
        setDates([
          moment(dateArr[0].name).format("L"),
          moment(dateArr[1].name).format("L"),
        ]);
      } else {
        setDates(["-", "-"]);
      }
    }
    return;
  }, [dateTravel]);

  return (
    <div className={styles.articleInfo_main}>
      <div className={styles.info_icon_div}>
        <IoLocationOutline size={"1.3rem"} />
        <div className={styles.locationArr}>
          {countriesArr?.length
            ? countriesArr?.map((el) => {
                return <span key={el.name}>{el.name}</span>;
              })
            : "---"}
        </div>
      </div>
      <div className={styles.info_icon_div}>
        <BsCalendarDate size={"1.3rem"} />
        <div className={styles.dates}>{`${dates[0]} - ${dates[1]}`}</div>
      </div>
    </div>
  );
};
