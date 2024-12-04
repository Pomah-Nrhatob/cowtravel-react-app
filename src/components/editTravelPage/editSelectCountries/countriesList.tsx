import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { countryList } from "../../../app/countryList";
import { SingleCountry } from "./singleCountry";

type Props = {
  addTravel?: (name: string) => void;
  inputValue: string;
};

export const CountriesList: React.FC<Props> = ({ addTravel, inputValue }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isReady, setIsReady] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  const handleEventClick = () => {
    ref.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  };

  useEffect(() => {
    const regexp = new RegExp(`^${inputValue}.*`, "i");
    setSelectedCountry(
      countryList.find((country: string) => regexp.test(country)) || ""
    );
    isReady ? setIsReady(false) : setIsReady(true);
  }, [inputValue]);

  useEffect(() => {
    if (selectedCountry) {
      handleEventClick();
    }
  }, [isReady]);

  return (
    <ul className={styles.countryList_ul}>
      {countryList.map((el) => {
        return (
          <div key={el} ref={el === selectedCountry ? ref : null}>
            <SingleCountry addTravel={addTravel} name={el} />
          </div>
        );
      })}
    </ul>
  );
};
