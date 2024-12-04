import React, { useEffect, useState } from "react";
import { EditTitle } from "../editTitle";
import styles from "./index.module.css";
import { Control } from "react-hook-form";
import { EditSelectCountries } from "../editSelectCountries";
import { ImageForMainPage, Travel } from "../../../app/types";
import { CalendarForm } from "../calendar";
import { EditImageForMainPage } from "../editImageForMainPage";

type Props = {
  placeholder: string;
  control: Control<any>;
  onSubmit: () => void;
  required?: string;
  addTravel?: (name: string) => void;
  removeTravel: (index: number) => void;
  countriesList: { id: string; name: string }[];
  dateTravel: { id: string; name: Date }[];
  dateTravelFromStore: any[] | null;
  isDirty: boolean;
  reset: any;
  addDates: (dateRange: [Date | null, Date | null]) => void;
  removeDates: () => void;
  imageForMainPage: ImageForMainPage | null;
  travelId: string | null;
};

export const EditForm: React.FC<Props> = ({
  placeholder,
  control,
  onSubmit,
  addTravel,
  removeTravel,
  countriesList,
  isDirty,
  reset,
  addDates,
  removeDates,
  dateTravel,
  dateTravelFromStore,
  imageForMainPage,
  travelId,
}) => {
  const [save, setSave] = useState(true);

  useEffect(() => {
    setSave(isDirty);
  }, [isDirty]);

  return (
    <form onSubmit={onSubmit}>
      <EditTitle name="title" placeholder={placeholder} control={control} />
      <EditImageForMainPage image={imageForMainPage} travelId={travelId} />
      <EditSelectCountries
        fields={countriesList}
        addTravel={addTravel}
        removeTravel={removeTravel}
        name="countries"
      />
      <CalendarForm
        dateTravelFromStore={dateTravelFromStore}
        dateTravel={dateTravel}
        addDates={addDates}
        removeDates={removeDates}
      />
      <div className={styles.save_btn}>
        {save ? <p>Изменения не сохранены</p> : <p></p>}
        <button type="submit" className={styles.save_btn}>
          Сохранить
        </button>
      </div>
    </form>
  );
};
