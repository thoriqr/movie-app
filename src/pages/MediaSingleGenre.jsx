import { useNavigate, useParams } from "react-router-dom";
import { fetchMedia } from "../api/themoviedbApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  capitalizeFirstLetter,
  getImgUrl,
  truncateString,
} from "../utils/utils";
import MediaCard from "../components/Card/MediaCard";
import Loading from "../components/Loading";
import { useEffect, useRef, useState } from "react";
import SortResults from "../components/MediaFilter/SortResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MediaGenre = () => {
  const { genreId, mediaType } = useParams();
  const [parsedGenreId] = genreId.split("-");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(null);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["mediaGenre", mediaType, genreId, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchMedia({
        mediaType: mediaType,
        filterMedia: sortBy,
        genreIds: parsedGenreId,
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
  console.log(data);

  const genreUrlParams = genreId.split("-");
  const genreName = capitalizeFirstLetter(genreUrlParams[1]);
  console.log(genreName);

  const [active, setActive] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const closeOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.body.addEventListener("click", closeOutside);
    return () => {
      document.body.removeEventListener("click", closeOutside);
    };
  }, []);

  const handleChangeMovie = () => {
    navigate(`/genre/${parsedGenreId}-${genreName.toLowerCase()}/movie`);
    setActive(false);
  };
  const handleChangeTv = () => {
    navigate(`/genre/${parsedGenreId}-${genreName.toLowerCase()}/tv`);
    setActive(false);
  };

  console.log(parsedGenreId, mediaType);
  return (
    <div className="max-w-full xl:max-w-7xl xl:mx-auto">
      <div>
        <div className="mb-5 mt-5">
          <p className="mt-5 mb-5 px-4 text-xl">{genreName}</p>
          <div className="md:flex md:justify-between items-center font-semibold text-base px-2 md:px-4">
            <div className="relative text-base" ref={menuRef}>
              <div
                onClick={() => setActive(!active)}
                className={`flex justify-between w-full md:w-32 px-2 py-1 rounded-sm cursor-pointer items-center border ${active ? "border-[#F5F9FF]" : "border-[#9CA3Af]"} hover:border-[#F5F9FF] `}
              >
                <p className="">
                  {mediaType === "movie" ? "Movies" : "TV Shows"}
                </p>
                <span className={`${active ? "text-[#F5F9FF]" : "text-[#9CA3Af]"} hover:text-[#F5F9FF]`}>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </span>
              </div>
              {active && (
                <div className="absolute top-10 z-10 w-full rounded-sm border border-[#F5F9FF] bg-[#030712]">
                  <div
                    onClick={handleChangeMovie}
                    className="border-b border-[#F5F9FF] cursor-pointer bg-[#030712] hover:bg-[#D8A31A] hover:text-[#030712]"
                  >
                    <p className="px-2 py-1">Movies</p>
                  </div>
                  <div onClick={handleChangeTv} className="cursor-pointer bg-[#030712] hover:bg-[#D8A31A] hover:text-[#030712]">
                    <p className="px-2 py-1">TV Shows</p>
                  </div>
                </div>
              )}
            </div>
            <div className="pt-2 md:pt-0">

            <SortResults mediaType={mediaType} setSortBy={setSortBy} />
            </div>
          </div>
        </div>
        {status === "loading" ? (
          <Loading height="h-screen" />
        ) : status === "error" ? (
          <p>{error.message}</p>
        ) : (
          <div>
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
                <p className="text-center text-[#F5F9FF]">{`No ${
                  mediaType === "movie" ? "Movies" : "TV shows"
                } found.`}</p>
              </div>
            )}
            <div className="text-center mt-6 mb-6 text-sm md:text-base">
              {hasNextPage ? (
                <button
                  className="items-center border-2 border-gray-500 rounded-md p-1 w-36"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <p className="text-gray-400">Loading...</p>
                  ) : (
                    hasNextPage && <p className="text-[#F5F9FF]">Load More</p>
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGenre;
