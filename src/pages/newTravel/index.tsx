import React, { useEffect } from "react";
import { EditTravelPage } from "../../components/editTravelPage";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

export const NewTravel = () => {
  return (
    <div>
      <EditTravelPage />
    </div>
  );
};
