import React, { useEffect } from "react";
import { TravelList } from "../editTravels/travelList";
import { ArticleList } from "./components/articleList";
import { useLazyGetPublishedTravelsQuery } from "../../app/services/publishedTravelApi";
import { useSelector } from "react-redux";
import { selectPublishedTravels } from "../../features/publishedTravelSlice";
import { useLocation } from "react-router-dom";
import { SelectPage } from "./components/selectPage";
import styles from "./index.module.css";

export const MainPageContainer = () => {
  const location = useLocation();
  const [getPublishedTravels] = useLazyGetPublishedTravelsQuery();

  const publishedTravels = useSelector(selectPublishedTravels);

  useEffect(() => {
    getPublishedTravels(
      `?page=${location.pathname.split("page")[1] || 1}`
    ).unwrap();

    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <ArticleList articleList={publishedTravels.rows} />
      <SelectPage
        location={location.pathname}
        countPage={publishedTravels.count}
      />
    </>
  );
};
