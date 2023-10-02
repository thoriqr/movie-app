import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMedia } from "../api/themoviedbApi";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/utils";
import MediaCard from "../components/Card/MediaCard";
import { getImgUrl, truncateString } from "../utils/utils";
import Loading from "../components/Loading";
import MediaFilter from "../components/MediaFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MediaList = () => {
  const { mediaType } = useParams();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openFilters, setOpenFilters] = useState(false)
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media", mediaType, selectedGenres, sortBy, startDate, endDate],
    queryFn: ({ pageParam = 1 }) =>
      fetchMedia({
        mediaType: mediaType,
        filterMedia: sortBy,
        genreIds: selectedGenres.join(","),
        dateGte: startDate,
        dateLte: endDate,
        pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageParam + 1;
      if (nextPage > lastPage.total_pages) {
        return undefined; // Stop fetching
      }
      return nextPage;
    },
  });

  useEffect(() => {
    setSelectedGenres([]);
    setSortBy(null);
    setOpenFilters(false)
  }, [mediaType, setSelectedGenres, setSortBy, setOpenFilters]);

  return (
    <div className="max-w-full xl:max-w-7xl xl:mx-auto">
      <div className="mb-5 mt-5">
        <p className="mt-5 mb-5 px-4 text-xl">
          {mediaType === "movie" ? "Explore Movies" : "Explore TV Shows"}
        </p>

        {/* <MediaFilter
          mediaType={mediaType}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setSortBy={setSortBy}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        /> */}
      </div>
      <div className="">
        <div className="px-10 mb-5">
          <div className="border border-white">
            <div onClick={() => setOpenFilters(!openFilters)} className="flex justify-between cursor-pointer items-center border-b-[1px] border-gray-600">
              <p className="p-2">Filters</p>
              <span className="px-4">
                {!openFilters ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronDown} />}
              </span>
            </div>
            {openFilters && <MediaFilter
            mediaType={mediaType}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            setSortBy={setSortBy}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />}
          </div>
          
        </div>
        {status === "loading" ? (
          <Loading height="h-screen" />
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <>
            {data?.pages.map((page, pageNumber) => (
              <div key={pageNumber} className="flex justify-center">
                <div className="grid grid-cols-2 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 gap-3">
                  {page.results.map((media) => (
                    <MediaCard
                      key={media.id}
                      media={media}
                      mediaType={mediaType}
                      cardSize="w-[180px] h-[350px] lg:w-[230px] lg:h-[410px]"
                      imgSize="w-[180px] h-[250px] lg:w-[230px] lg:h-[300px]"
                      contentSize="h-[100px] lg:h-[110px]"
                      titleSize="text-sm lg:text-base"
                      dateSize="text-xs lg:text-sm"
                      srcImgUrl={getImgUrl(media.poster_path, "w342")}
                      showGenres={true}
                      truncateMediaTitle={truncateString(
                        media.title || media.name,
                        18
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
            {data?.pages.every((page) => page.results.length === 0) && (
              <div className="h-screen">
                <p className="text-center text-[#F5F9FF]">{`No Any ${capitalizeFirstLetter(
                  mediaType
                )}'s Found`}</p>
              </div>
            )}
            <div className="text-center mt-6 mb-6">
              <button
                className="text-white"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loading />
                ) : hasNextPage ? (
                  "Load More"
                ) : (
                  ""
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaList;
