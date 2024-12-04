import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

type Props = {
  addDates: (dateRange: [Date | null, Date | null]) => void;
  removeDates: () => void;
  dateTravel: { id: string; name: Date }[];
  dateTravelFromStore: any[] | null;
};

export const CalendarForm: React.FC<Props> = ({
  addDates,
  removeDates,
  dateTravel,
  dateTravelFromStore,
}) => {
  const datepickerRef = useRef(null);
  const [dateRange, setDateRange] = useState<[any | null, any | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (dateTravelFromStore && dateTravelFromStore[0].name !== null) {
      setDateRange([dateTravelFromStore[0].name, dateTravelFromStore[1].name]);
    } else {
      setDateRange([null, null]);
    }
  }, [dateTravelFromStore]);

  useEffect(() => {
    addDates(dateRange);
  }, [dateRange]);

  const handleDateRange = (dates: any) => {
    dates ? setDateRange(dates) : setDateRange([null, null]);
  };

  return (
    <div className="calendar_main">
      <h2>Выберете дату путешествия</h2>
      <DateRangePicker
        showOneCalendar={true}
        value={
          dateRange[0] ? [new Date(dateRange[0]), new Date(dateRange[1])] : null
        }
        onChange={handleDateRange}
      />
    </div>
  );
};
