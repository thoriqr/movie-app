/* eslint-disable react/prop-types */
import Genres from "./Genres";
import DatePick from "./DatePick";
import SortResults from "./SortResults";

const MediaFilter = ({
  mediaType,
  selectedGenres,
  setSelectedGenres,
  setSortBy,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="block text-sm w-full relative md:flex md:justify-between md:gap-2">
      <div className="w-full md:w-1/2">
        <div className="border-b-[1px] border-gray-600 px-2 py-3 md:border-none ">
          <p className="mb-2 font-light text-gray-200">Sort Results By</p>
          <SortResults mediaType={mediaType} setSortBy={setSortBy} />
        </div>
        <div className="border-b-[1px] border-gray-600 px-2 py-3 md:border-none">
          <p className="mb-2 font-light text-gray-200">Genres</p>
          <Genres
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            mediaType={mediaType}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <DatePick
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          mediaType={mediaType}
        />
      </div>
    </div>
  );
};

export default MediaFilter;
