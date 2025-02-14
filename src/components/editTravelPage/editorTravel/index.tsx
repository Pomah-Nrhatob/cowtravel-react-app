import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EditForm } from "../editForm";
import styles from "./index.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useLazyGetOneTravelQuery,
  useUpdateTravelMutation,
} from "../../../app/services/travelApi";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectTravelInfo } from "../../../features/oneTravelInfoSlice";
import { Travel } from "../../../app/types";
import { useLazyGetChaptersQuery } from "../../../app/services/chapterApi";
import { ContentEditor } from "../contentEditor";
import { selectChapters } from "../../../features/chaptersSlice";
import { Tooltip, TooltipRefProps } from "react-tooltip";
import useOutsideAlerter from "../../../utils/useOutsideAlertet";
import { toast, ToastContainer } from "react-toastify";
import { hasErrorField } from "../../../utils/hasErrorfield";

export const EditorTravel: React.FC = () => {
  const id = useLocation().pathname.split("/")[2];
  const travelInfo = useSelector(selectTravelInfo);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<Travel>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { title: "", countries: [], dateTravel: [null, null] },
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

  useEffect(() => {
    try {
      getTravel(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    reset({
      ...travelInfo,
    });
  }, [travelInfo]);

  const [updateTravel] = useUpdateTravelMutation();
  const [getTravel, { isLoading }] = useLazyGetOneTravelQuery();
  const [getChapters] = useLazyGetChaptersQuery();
  const chapters = useSelector(selectChapters);
  const [errorState, setErrorState] = useState<string>("");

  const successUpdate = () =>
    toast.success("Изменения сохранены", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const errorUpdate = () =>
    toast.error(errorState, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSave = async (data: Travel) => {
    try {
      await updateTravel(data).unwrap();
      successUpdate();
      reset({ ...data });
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorState(error.data.message);
      }
    }
  };

  const handleAddTravel = (name: string) => {
    addTravel(name);
  };
  const handleRemoveTravel = (index: number) => {
    removeTravel(index);
  };

  const publishButton = () => {
    navigate(`/edittravels/publish/${id}`);
  };

  const handleCheckChapters = () => {
    if (chapters.length > 0) {
      if (chapters[0].id) {
        publishButton();
      } else {
        setShowTooltip(true);
      }
    } else {
      setShowTooltip(true);
    }
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const clickOutside = useRef(null);

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  useOutsideAlerter(clickOutside, closeTooltip);

  return (
    <>
      <div tabIndex={0} className={styles.editTravel_main}>
        <button
          ref={clickOutside}
          data-tooltip-id="tooltip2"
          onClick={handleCheckChapters}
        >
          {travelInfo.isPublished ? "Внести изменения" : "Опубликовать"}
        </button>
        <Tooltip
          data-tooltip-delay-show={20}
          isOpen={showTooltip}
          id="tooltip2"
          content="Для публикации необходимы заполненные главы"
          place="left"
          className={styles.tooltip_rounded}
        />
        <h1>Создание статьи</h1>
        {isLoading ? (
          <BarLoader color="#A2A2FF" />
        ) : (
          <EditForm
            imageForMainPage={travelInfo.image}
            dateTravelFromStore={travelInfo.dateTravel}
            dateTravel={dateTravelList}
            addDates={addDates}
            removeDates={removeDates}
            reset={reset}
            isDirty={isDirty}
            countriesList={countriesList}
            addTravel={handleAddTravel}
            removeTravel={handleRemoveTravel}
            onSubmit={handleSubmit(handleSave)}
            placeholder="Название"
            control={control}
            travelId={travelInfo.id}
          />
        )}
        <ToastContainer />
      </div>
      <ContentEditor travelId={id} />
    </>
  );
};
