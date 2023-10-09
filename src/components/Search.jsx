/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchMulti } from "../api/themoviedbApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faSearch,
  faTv,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/utils";
import Loading from "./Loading";

const Search = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get("query");
  const [query, setQuery] = useState(queryParams || "");
  const [mediaType, setMediaType] = useState("multi");
  const { data, status, error } = useQuery({
    queryKey: ["searchMedia", mediaType, query],
    queryFn: () => searchMulti({ mediaType: mediaType, query }),
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const query = event.target.value;
    setQuery(query);
    queryClient.prefetchQuery(["searchMedia", mediaType], () =>
      searchMulti({ mediaType: mediaType, query })
    );
  };

  const searchByMediaType = (type) => {
    navigate(`/search/${type}?query=${query}`);
    setCollapse(false);
  };

  const handleSearch = () => {
    navigate(`/search/multi?query=${query}`);
    setQuery("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setCollapse(false);
    }
  };

  const [collapse, setCollapse] = useState(false);
  const searchRef = useRef();
  useEffect(() => {
    const closeOutside = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setCollapse(false);
        setQuery("");
      }
    };
    document.body.addEventListener("click", closeOutside);
    return () => {
      document.body.removeEventListener("click", closeOutside);
    };
  }, []);

  const openSearch = () => {
    setCollapse(!collapse);
    setQuery("");
  };

  return (
    <>
      <div className="" ref={searchRef}>
        <button
          className="flex justify-center items-center px-6 h-12 text-[#F5F9FF] relative"
          onClick={openSearch}
        >
          {collapse ? (
            <span className="absolute">
              <FontAwesomeIcon size="lg" icon={faXmark} />
            </span>
          ) : (
            <span className="absolute">
              <FontAwesomeIcon size="lg" icon={faSearch} />
            </span>
          )}
        </button>

        {collapse ? (
          <div className="absolute left-0 w-full top-16">
            <input
              type="search"
              placeholder="Type here..."
              value={query}
              onKeyUp={handleKeyPress}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-700 rounded-none focus:outline-none w-full bg-[#030712] text-[#F5F9FF] font-Inter font-semibold text-sm md:text-lg placeholder:italic placeholder:font-normal"
            />
            <div className="w-full rounded rounded-t-none bg-[#030712] border border-t-0 border-[#32343C] relative ">
              <div className="font-semibold text-[#F5F9FF] pt-2">
                {status === "loading" ? (
                  <Loading height="h-[80px]" />
                ) : (
                  <>
                    {query.length === 0 ? (
                      <p className="p-5 text-center text-sm lg:text-base italic font-extralight">
                        Type to start searching
                      </p>
                    ) : error ? (
                      <div>{error.message}</div>
                    ) : data?.results.length === 0 ? (
                      <p className="p-5 text-center text-sm lg:text-base italic font-extralight">
                        No items were found
                      </p>
                    ) : (
                      <>
                        <div className="text-sm lg:text-base">
                          {data?.results.some(
                            (result) => result.media_type === "person"
                          ) && (
                            <div
                              onClick={() => searchByMediaType("person")}
                              className="cursor-pointer flex items-center hover:bg-[#D8A31A] hover:text-[#32343C] w-full mt-1 px-2 py-1 border-gray-700 border-b-2"
                            >
                              <FontAwesomeIcon
                                className=""
                                icon={faUser}
                                size="sm"
                              />
                              <p className="px-2">{query} in People</p>
                            </div>
                          )}
                          {data?.results.some(
                            (result) => result.media_type === "movie"
                          ) && (
                            <div
                              onClick={() => searchByMediaType("movie")}
                              className="cursor-pointer flex items-center hover:bg-[#D8A31A] hover:text-[#32343C] w-full mt-1 px-2 py-1 border-gray-700 border-b-2"
                            >
                              <FontAwesomeIcon
                                className=""
                                icon={faTv}
                                size="sm"
                              />
                              <p className="px-2">{query} in Movie</p>
                            </div>
                          )}
                          {data?.results.some(
                            (result) => result.media_type === "tv"
                          ) && (
                            <div
                              onClick={() => searchByMediaType("tv")}
                              className="cursor-pointer flex items-center hover:bg-[#D8A31A] hover:text-[#32343C] w-full mt-1 px-2 py-1 border-gray-700 border-b-2"
                            >
                              <FontAwesomeIcon
                                className=""
                                icon={faFilm}
                                size="sm"
                              />
                              <p className="px-2">{query} in TV</p>
                            </div>
                          )}
                        </div>

                        <div>
                          {data?.results.splice(0, 10).map((media) => (
                            <div className="group" key={media.id}>
                              <button
                                className="hover:bg-[#D8A31A] hover:text-[#32343C] w-full p-2 border-gray-700 border-b-2"
                                onClick={() => {
                                  navigate(`/${media.media_type}/${media.id}`);
                                  setCollapse(false);
                                }}
                              >
                                <div className="flex flex-wrap text-sm lg:text-base items-center gap-[2px]">
                                  <p className=" font-semibold">
                                    {media.title || media.name}
                                  </p>
                                  <p className="font-light">
                                    {formatDate(
                                      media.release_date ||
                                        media.first_air_date,
                                      "year"
                                    )}
                                  </p>
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center text-sm lg:text-base py-3 bg-gray-800">
                          <button className="w-full" onClick={handleSearch}>
                            <p className="font-light italic">
                              View All Results
                            </p>
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;
