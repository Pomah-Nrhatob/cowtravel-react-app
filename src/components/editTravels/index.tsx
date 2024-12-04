import React, { useEffect } from "react";
import styles from "./index.module.css";
import { HeaderEditTravelsPage } from "./headerEditTravelsPage";
import { TravelList } from "./travelList";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { EditTravelsContainer } from "./editTravelsContainer";
import { NotAuthUser } from "../notAuthUser";

export const EditTravels: React.FC = () => {
  const userInfo = useSelector(selectCurrent);

  return (
    <>
      {userInfo ? (
        <EditTravelsContainer name={userInfo!.name} />
      ) : (
        <NotAuthUser />
      )}
    </>
  );
};
