import { useQuery } from "@tanstack/react-query";
import { getMediaById } from "../api/themoviedbApi";
import { useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Recommendations from "../components/Recommendations";
import Loading from "../components/Loading";
import PeopleCard from "../components/Card/PeopleCard";
import Swipe from "../components/Swipe";
import MediaInfo from "../components/MediaInfo";

const MediaDetails = () => {
  const { mediaType, mediaId } = useParams();
  const {
    data: media,
    status,
    error,
  } = useQuery({
    queryKey: ["mediaDetails", mediaType, mediaId],
    queryFn: () => getMediaById({ mediaType, mediaId }),
  });

  const data = media?.recommendations.results;

  const backdropImg = () => {
    if (media?.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`;
    } else {
      return "";
    }
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
      slidesPerView: 6,
      spaceBetween: 1,
    },
    1440: {
      slidesPerView: 7,
      spaceBetween: 1,
    },
  };

  console.log(media);

  return (
    <>
      {status === "loading" ? (
        <Loading height="h-screen" />
      ) : error ? (
        <div className="">{error.message}</div>
      ) : (
        <>
          <div className="relative ">
            <div className="absolute top-0 md:right-0 md:absolute md:w-9/12 bg-gradient-to-r from-[#030712] from-10% via-gray-400 via-100%">
              <img
                className="object-cover object-top w-full h-[480px] md:mix-blend-overlay "
                src={backdropImg()}
                alt={media.title || media.name}
              />
            </div>
            <div className="absolute top-0 bg-[#030712] w-full h-[480px] opacity-60"></div>
          </div>

          <div className="max-w-full xl:max-w-7xl xl:mx-auto mt-4 text-[#F5F9FF] h-screen">
            <MediaInfo media={media} mediaType={mediaType} />
            <div className="mt-8 px-2">
              <div className="">
                <p className="text-xl font-semibold">
                  {mediaType === "movie" ? "Top Cast" : "Series Cast"}{" "}
                </p>
              </div>
              {(!media?.credits.cast?.length && mediaType === "movie") ||
              (!media?.aggregate_credits?.cast.length && mediaType === "tv") ? (
                <p className="mt-2">{`We don't have any cast added to this ${mediaType}.`}</p>
              ) : (
                <div className="flex mt-4 w-full">
                  <Swipe customBreakpoints={customBreakpoints}>
                    {mediaType === "movie" &&
                      media?.credits.cast.slice(0, 13).map((credit) => (
                        <SwiperSlide key={credit.cast_id}>
                          <PeopleCard credit={credit} mediaType={mediaType} />
                        </SwiperSlide>
                      ))}
                    {mediaType === "tv" &&
                      media?.aggregate_credits.cast
                        .slice(0, 13)
                        .map((credit) => (
                          <SwiperSlide key={credit.id}>
                            <PeopleCard credit={credit} mediaType={mediaType} />
                          </SwiperSlide>
                        ))}
                  </Swipe>
                </div>
              )}
              <div className="mt-8">
                <Recommendations
                  media={media}
                  data={data}
                  mediaId={mediaId}
                  mediaType={mediaType}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MediaDetails;
