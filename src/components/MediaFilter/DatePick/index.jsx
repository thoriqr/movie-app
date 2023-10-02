/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ setStartDate, setEndDate, mediaType }) => {
  const [selectStartDate, setSelectStartDate] = useState(null);
  const [selectEndDate, setSelectEndDate] = useState(null);
  const [storeStartDate, setStoreStartDate] = useState("");
  const [storeEndDate, setStoreEndDate] = useState("");

  useEffect(() => {
    setStartDate("");
    setEndDate("");
    setSelectStartDate(null);
    setSelectEndDate(null);
    setStoreStartDate("");
    setStoreEndDate("");
  }, [
    mediaType,
    setStartDate,
    setEndDate,
    setSelectStartDate,
    setSelectEndDate,
    setStoreStartDate,
    setStoreEndDate,
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
    setStoreStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    setSelectEndDate(date);
    const formattedDate = formatDate(date);
    setStoreEndDate(formattedDate);
  };

  const handleDateFilter = () => {
    if (storeStartDate === "" || storeEndDate === "") {
      setStartDate("");
      setEndDate("");
    } else {
      setStartDate(storeStartDate);
      setEndDate(storeEndDate);
    }
  };

  console.log("storing start date", storeStartDate);
  console.log("storing end date", storeEndDate);

  const resetCalendar = () => {
    // Set the selected dates to null to clear the selections
    setSelectStartDate(null);
    setSelectEndDate(null);
    // Reset the formatted date strings to empty strings
    setStartDate("");
    setEndDate("");
    setStoreStartDate("");
    setStoreEndDate("");
  };

  return (
    <>
      <div className="relative text-white text-sm px-2 pt-2">
        <p className="">Release Dates</p>
        <div className="flex justify-between pt-2">
          <p>from</p>
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
            {selectStartDate !== null && (
              <button
                onClick={() => {
                  setSelectStartDate(null);
                  setStoreStartDate("");
                }}
                className="absolute right-0 text-black items-center px-2 py-1"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <span className="text-black absolute top-0 left-0 items-center px-2 py-1">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <button
              onClick={handleDateFilter}
              className="text-white w-60 border border-white ml-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div className="relative text-white text-sm px-2 py-3">
        <div className="flex justify-between">
          <p>to</p>
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
            {selectEndDate !== null && (
              <button
                onClick={() => {
                  setSelectEndDate(null);
                  setStoreEndDate("");
                }}
                className="absolute right-0 text-black items-center px-2 py-1"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
            <span className="text-black absolute top-0 left-0 items-center px-2 py-1">
              <FontAwesomeIcon icon={faCalendar} />
            </span>

            <button
              className="text-white w-60 border border-white ml-2"
              onClick={resetCalendar}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePick;
