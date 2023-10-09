import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMulti } from "../api/themoviedbApi";
import { formatDate, getImgUrl, truncateString } from "../utils/utils";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFilm, faTv } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const SearchResults = () => {
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const query = searchParams.get("query");
  const { data, status, error, isPreviousData } = useQuery({
    queryKey: ["searchFiltered", mediaType, page, query],
    queryFn: () =>
      searchMulti({ mediaType: mediaType, pageParam: page, query }),
  });

  useEffect(() => {
    setPage(1);
  }, [mediaType]);

  const filteredResults = data?.results.filter((item) => {
    if (mediaType === "person") {
      return (item.media_type = "person");
    } else if (mediaType === "movie") {
      return (item.media_type = "movie");
    } else if (mediaType === "tv") {
      return (item.media_type = "tv");
    } else if (mediaType === "multi") {
      return true;
    }
  });

  const movieTvStyle = {
    imgSize: "w-[100px] h-[140px]",
  };

  const peopleStyle = {
    imgSize: "w-[70px] h-[70px]",
  };

  const customStyles = {
    common: "w-3/4", // Common style for all media types
    movie: movieTvStyle, // Style for movies
    tv: movieTvStyle, // Style for TV shows
    person: peopleStyle, // Style for persons
  };

  const { pathname } = useLocation();
  console.log(pathname);

  const mediaTypeIcon = (mediaType) => {
    if (mediaType === "movie") {
      return faTv;
    } else if (mediaType === "tv") {
      return faFilm;
    } else if (mediaType === "person") {
      return faUser;
    }
  };

  console.log(data);

  return (
    <>
      {status === "loading" ? (
        <Loading height="h-screen" />
      ) : status === "error" ? (
        <div className="">{error.message}</div>
      ) : (
        <div className="">
          {filteredResults.length === 0 ? (
            <div className="text-center mt-40">
              <p className="font-semibold text-[#F5F9FF] text-base md:text-lg">
                No results found
              </p>
            </div>
          ) : (
            <div className="text-[#F5F9FF] max-w-4xl mx-auto">
              {data?.total_results ? (
                <p className="mt-4 text-sm font-medium">{data?.total_results} Items found</p>
              ) : (
                ""
              )}
              {filteredResults.map((media) => (
                <div
                  key={media.id}
                  className={`flex mt-4 border-2 border-gray-500 w-full rounded-md bg-[#030712] relative`}
                >
                  <figure
                    className={`${customStyles[media.media_type].imgSize}`}
                  >
                    <img
                      onClick={() =>
                        navigate(`/${media.media_type}/${media.id}`)
                      }
                      className={`rounded-l-md  object-cover object-center cursor-pointer ${
                        customStyles[media.media_type].imgSize
                      }`}
                      src={getImgUrl(
                        media.profile_path || media.poster_path,
                        "w185"
                      )}
                      alt={media.title || media.name}
                      title={media.title || media.name}
                    />
                  </figure>

                  <div className="px-2 w-full py-1 text-sm md:text-base">
                    <div className="flex justify-between text-sm md:text-base ">
                      <p
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/${media.media_type}/${media.id}`)
                        }
                        title={media.title || media.name}
                      >
                        {media.title || media.name}
                      </p>
                      <span
                        className="absolute top-2 right-2"
                        title={media.media_type}
                      >
                        {pathname === "/search/multi" ? (
                          <FontAwesomeIcon
                            icon={mediaTypeIcon(media.media_type)}
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>

                    <p className="mt-1">
                      {media.release_date || media.first_air_date
                        ? formatDate(
                            media.release_date || media.first_air_date,
                            "full"
                          )
                        : ""}
                    </p>
                    <div className="mt-2 ">
                      <p className="">
                        {media.overview
                          ? truncateString(media.overview, 200)
                          : ""}
                      </p>

                      <div className="flex gap-1">
                        {media.known_for
                          ? media.known_for
                              .filter((actor) => actor.title)
                              .map((actor, index, array) => (
                                <span
                                  className="hover:text-gray-300 cursor-pointer"
                                  title={actor.title}
                                  onClick={() =>
                                    navigate(`/${actor.media_type}/${actor.id}`)
                                  }
                                  key={actor.id}
                                >
                                  {actor.title}
                                  {index !== array.length - 1 && ", "}{" "}
                                  {/* Add comma if not the last item */}
                                </span>
                              ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data?.results.length === 0 ? "" :<Pagination data={data} isPreviousData={isPreviousData} page={page} setPage={setPage}/>}
        </div>
      )}
    </>
  );
};

export default SearchResults;
