import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { SingleTravel } from "../singleTravel";
import { selectTravels } from "../../../features/travelsSlice";
import { useSelector } from "react-redux";
import { useLazyGetTravelsQuery } from "../../../app/services/travelApi";
import { BarLoader } from "react-spinners";
import { useLazyRefreshQuery } from "../../../app/services/usersApi";
import { SortBtn } from "./SortBtn";

export const TravelList: React.FC = () => {
  const travelList = useSelector(selectTravels);
  const [travels, { isLoading }] = useLazyGetTravelsQuery();
  const [viewState, setViewState] = useState<string>("notPublished");
  const publishedTravelList = travelList.filter((el) => el.isPublished == true);
  const draftList = travelList.filter((el) => el.isPublished !== true);

  useEffect(() => {
    try {
      travels().unwrap();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.travelList}>
      <div className={styles.sort_btn}>
        Сначала показать:
        <SortBtn
          title="Черновики"
          name="notPublished"
          viewState={viewState}
          setViewState={setViewState}
        />
        <SortBtn
          title="Опубликованные"
          name="published"
          viewState={viewState}
          setViewState={setViewState}
        />
      </div>
      {isLoading ? (
        <BarLoader color="#A2A2FF" />
      ) : viewState == "notPublished" ? (
        draftList.map((el) => {
          return (
            <SingleTravel
              isPublished={el.isPublished}
              createdAt={el.createdAt}
              key={el.id}
              id={el.id}
              title={el.title}
            />
          );
        })
      ) : (
        publishedTravelList.map((el) => {
          return (
            <SingleTravel
              isPublished={el.isPublished}
              createdAt={el.createdAt}
              key={el.id}
              id={el.id}
              title={el.title}
            />
          );
        })
      )}
    </div>
  );
};
