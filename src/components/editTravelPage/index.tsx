import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { NotAuthUser } from "../notAuthUser";
import { EditTravelContainer } from "./editTravelContainer";

export const EditTravelPage: React.FC = () => {
  const userInfo = useSelector(selectCurrent);

  return <>{userInfo ? <EditTravelContainer /> : <NotAuthUser />}</>;
};
