import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { CountriesList } from "./countriesList";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useOutsideAlerter from "../../../utils/useOutsideAlertet";
import { SelectedCountryList } from "./selectedCountryList";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  addTravel?: (name: string) => void;
  removeTravel: (index: number) => void;
  fields: { id: string; name: string }[];
};

export const EditSelectCountries: React.FC<Props> = ({
  name,
  addTravel,
  removeTravel,
  fields,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [select, setSelect] = useState(false);
  const wrapperRef = useRef(null);

  const closeEdit = () => {
    setSelect(false);
    setInputValue("");
  };

  useOutsideAlerter(wrapperRef, closeEdit);

  return (
    <div className={styles.editSelectCoutry_main}>
      <h2>Выберете страны</h2>
      <SelectedCountryList removeTravel={removeTravel} fields={fields} />
      <div className={styles.editCountry} ref={wrapperRef}>
        <div
          onFocus={() => setSelect(true)}
          className={select ? styles.input_active : styles.input_deactive}
        >
          <input
            placeholder="Введите страну"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          {select ? (
            <IoIosArrowUp
              onClick={() => setSelect(false)}
              size="2rem"
              color="gray"
            />
          ) : (
            <IoIosArrowDown
              onClick={() => setSelect(true)}
              size="2rem"
              color="gray"
            />
          )}
        </div>
        {select ? (
          <CountriesList inputValue={inputValue} addTravel={addTravel} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
