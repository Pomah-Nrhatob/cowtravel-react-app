import React, { useEffect, useLayoutEffect } from "react";
import { EditTravels } from "../../components/editTravels";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { resetTravelInfo } from "../../features/oneTravelInfoSlice";
import { AppDispatch } from "../../app/store";
import { resetChaptersList } from "../../features/chaptersSlice";

export const EditTravelsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetTravelInfo());
    dispatch(resetChaptersList());
  }, []);

  return (
    <div>
      <EditTravels />
    </div>
  );
};
