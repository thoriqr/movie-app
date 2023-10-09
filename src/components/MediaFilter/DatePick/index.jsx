/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ setStartDate, setEndDate, mediaType }) => {
  const currentDate = new Date();

  // Calculate the date two years in the future
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(currentDate.getFullYear() + 2);

  const [selectStartDate, setSelectStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState(twoYearsFromNow);

  useEffect(() => {
    setStartDate("");
    setEndDate("");
    setSelectStartDate("");
    setSelectEndDate(twoYearsFromNow);

  }, [
    mediaType,
    setStartDate,
    setEndDate,
    setSelectStartDate,
    setSelectEndDate,
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (date) => {
    setSelectStartDate(date);
    const formattedDate = formatDate(date);
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    setSelectEndDate(date);
    const formattedDate = formatDate(date);
    setEndDate(formattedDate);
  };

  return (
    <>
      <div className="relative text-sm px-2 py-3 w-full">
        <p className="mb-2 font-light text-gray-200">Release Dates</p>
        <div className="flex justify-between">
          <p className="font-light text-gray-200">from</p>
          <div className="relative w-11/12 flex">
            <DatePicker
              id="releaseDate.gte"
              calendarClassName=""
              className="font-semibold pl-7 pr-2 py-1 text-black w-full outline-none rounded-sm"
              selected={selectStartDate}
              onSelect={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              autoComplete="off"
              todayButton="Today"
            />
            {selectStartDate !== "" && (
              <button
                onClick={() => {
                  setSelectStartDate("");
                  setStartDate("");
                }}
                className="absolute right-0 text-black items-center px-2 py-1"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <span className="text-black absolute top-0 left-0 items-center px-2 py-1">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
        </div>
      </div>
      <div className="relative text-white text-sm px-2 py-3">
        <div className="flex justify-between">
          <p className="font-light text-gray-200">to</p>
          <div className="relative w-11/12 flex">
            <DatePicker
              id="releaseDate.lte"
              calendarClassName=""
              className="font-semibold pl-7 pr-2 py-1 text-black w-full rounded-sm"
              selected={selectEndDate}
              onSelect={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              autoComplete="off"
              todayButton="Today"
            />
            {selectEndDate !== "" && (
              <button
                onClick={() => {
                  setSelectEndDate("");
                  setEndDate("");
                }}
                className="absolute right-0 text-black items-center px-2 py-1"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <span className="text-black absolute top-0 left-0 items-center px-2 py-1">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePick;
