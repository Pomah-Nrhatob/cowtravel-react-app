import React, { useState } from "react";
import { EditForm } from "../editForm";
import styles from "./index.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { useCreateTravelMutation } from "../../../app/services/travelApi";
import { useNavigate } from "react-router-dom";
import { Travel } from "../../../app/types";
import { useSelector } from "react-redux";
import { selectTravelInfo } from "../../../features/oneTravelInfoSlice";

export const NewTravel: React.FC = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<Travel>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      countries: null,
      dateTravel: null,
    },
  });

  const {
    fields: countriesList,
    append: appendCountry,
    remove: removeCountry,
  } = useFieldArray<Travel, "countries">({
    control,
    name: "countries",
  });

  const {
    fields: dateTravelList,
    replace: replaceDateTravel,
    remove: removeDateTravel,
  } = useFieldArray<Travel, "dateTravel">({
    control,
    name: "dateTravel",
  });

  const addDates = (dateRange: [Date | null, Date | null]) => {
    replaceDateTravel([{ name: dateRange[0] }, { name: dateRange[1] }]);
  };

  const removeDates = () => {
    removeDateTravel();
  };

  const addTravel = (name: string) => {
    appendCountry({ name: name });
  };

  const removeTravel = (index: number) => {
    removeCountry(index);
  };

  const handleAddTravel = (name: string) => {
    addTravel(name);
  };
  const handleRemoveTravel = (index: number) => {
    removeTravel(index);
  };

  const [createTravel, { isLoading }] = useCreateTravelMutation();
  const navigate = useNavigate();
  const [save, setSave] = useState(false);
  const travelInfo = useSelector(selectTravelInfo);

  const handleNewTravel = async (data: Travel) => {
    try {
      const travel = await createTravel(data).unwrap();
      const travelId = travel.id;
      navigate(`/edittravels/${travelId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div tabIndex={0} className={styles.editTravel_main}>
      <h1>Создание статьи</h1>
      <EditForm
        dateTravelFromStore={travelInfo.dateTravel}
        addDates={addDates}
        removeDates={removeDates}
        reset={reset}
        isDirty={isDirty}
        onSubmit={handleSubmit(handleNewTravel)}
        placeholder="Название"
        control={control}
        countriesList={countriesList}
        dateTravel={dateTravelList}
        addTravel={handleAddTravel}
        removeTravel={handleRemoveTravel}
        imageForMainPage={null}
        travelId={null}
      />
    </div>
  );
};
