/* eslint-disable react/prop-types */
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { getImgUrl, truncateString } from "../utils/utils";
import {
  useMediaTrendingQuery,
  useMediaPopularQuery,
  useTopRatedMediaQuery,
} from "../hooks/useMediaQuery";
import ToggleMedia from "./ToggleMedia";
import MediaCard from "./Card/MediaCard";
import Loading from "./Loading";
import Swipe from "./Swipe";

export const TrendingBanner = () => {
  const { data, status, error } = useMediaTrendingQuery({
    timeWindow: "week",
    mediaType: "movie",
  });

  const [bannerImg, setBannerImg] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Sort and access the first element
      const sortTrending = data.sort((a, b) => b.popularity - a.popularity);
      setBannerImg(sortTrending[0]);
    }
  }, [data]);

  return (
    <>
      {status === "loading" ? (
        <div className="w-full h-96 md:h-[500px] bg-slate-700 animate-pulse"></div>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <>
          <div className="w-full h-96 md:h-[500px] bg-gradient-to-t from-[#030712] from-10% via-gray-400 via-100%">
            <img
              className=" w-full h-full object-cover object-center mix-blend-overlay"
              src={getImgUrl(bannerImg.backdrop_path, "w1280")}
              alt=""
            />
          </div>
        </>
      )}
    </>
  );
};

const customBreakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 1,
  },
  375: {
    slidesPerView: 2,
    spaceBetween: 1,
  },
  425: {
    slidesPerView: 2,
    spaceBetween: 1,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 1,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 1,
  },
  1440: {
    slidesPerView: 6,
    spaceBetween: 1,
  },
};

const styleProps = {
  cardSize: "w-[175px] sm:w-[180px] h-[310px]",
  imgSize: "w-[175px] sm:w-[180px] h-[240px]",
  contentSize: "h-[70px]",
  titleSize: "text-sm",
  dateSize: "text-sm",
  showGenres: false,
};

export const SwipeTrending = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [mediaType, setMediaType] = useState("movie");
  const { data, status, error } = useMediaTrendingQuery({
    timeWindow,
    mediaType,
  });
  const toggleTimeWindow = (newTimeWindow) => {
    setTimeWindow(newTimeWindow);
  };

  return (
    <>
      <div className="mt-6 mb-4 items-center">
        <p className="text-lg md:text-xl">Trending</p>
        <div className="flex justify-between mt-2">
          <div className="flex flex-wrap bg-[#030712] text-gray-500 items-center">
            <a
              onClick={() => toggleTimeWindow("day", setTimeWindow)}
              className={`py-1 px-2 text-xs md:text-sm rounded-l-md font-semibold cursor-pointer ${
                timeWindow === "day"
                  ? "bg-[#D8A31A] text-[#030712]"
                  : "bg-[#030712]"
              }`}
            >
              Day
            </a>
            <a
              onClick={() => toggleTimeWindow("week", setTimeWindow)}
              className={`py-1 px-2 text-xs md:text-sm rounded-r-md font-semibold cursor-pointer ${
                timeWindow === "week"
                  ? "bg-[#D8A31A] text-[#030712]"
                  : "bg-[#030712]"
              }`}
            >
              Week
            </a>
          </div>
          <ToggleMedia mediaType={mediaType} setMediaType={setMediaType} />
        </div>
      </div>
      {status === "loading" ? (
        <Loading height="h-[310px]" />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Swipe customBreakpoints={customBreakpoints}>
          {data?.map((media) => (
            <SwiperSlide key={media.id}>
              <MediaCard
                media={media}
                mediaType={mediaType}
                srcImgUrl={getImgUrl(media.poster_path, "w342")}
                truncateMediaTitle={truncateString(
                  media.title || media.name,
                  18
                )}
                {...styleProps}
              />
            </SwiperSlide>
          ))}
        </Swipe>
      )}
    </>
  );
};

export const SwipePopular = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, status, error } = useMediaPopularQuery(mediaType);
  return (
    <>
      <div className="mt-6 mb-4 items-center flex justify-between">
        <p className="text-lg md:text-xl">What&apos;s Popular</p>
        <ToggleMedia mediaType={mediaType} setMediaType={setMediaType} />
      </div>
      {status === "loading" ? (
        <Loading height="h-[310px]" />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Swipe customBreakpoints={customBreakpoints}>
          {data?.map((media) => (
            <SwiperSlide key={media.id}>
              <MediaCard
                media={media}
                mediaType={mediaType}
                srcImgUrl={getImgUrl(media.poster_path, "w342")}
                truncateMediaTitle={truncateString(
                  media.title || media.name,
                  18
                )}
                {...styleProps}
              />
            </SwiperSlide>
          ))}
        </Swipe>
      )}
    </>
  );
};

export const SwipeTopRated = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, status, error } = useTopRatedMediaQuery(mediaType);

  return (
    <>
      <div className="mt-6 mb-4 items-center flex justify-between">
        <p className="text-lg md:text-xl">Top Rated</p>
        <ToggleMedia mediaType={mediaType} setMediaType={setMediaType} />
      </div>
      {status === "loading" ? (
        <Loading height="h-[310px]" />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Swipe customBreakpoints={customBreakpoints}>
          {data?.map((media) => (
            <SwiperSlide key={media.id}>
              <MediaCard
                media={media}
                mediaType={mediaType}
                srcImgUrl={getImgUrl(media.poster_path, "w342")}
                truncateMediaTitle={truncateString(
                  media.title || media.name,
                  18
                )}
                {...styleProps}
              />
            </SwiperSlide>
          ))}
        </Swipe>
      )}
    </>
  );
};
