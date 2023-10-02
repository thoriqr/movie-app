/* eslint-disable react/prop-types */
import {
  capitalizeFirstLetter,
  getImgUrl,
  truncateString,
} from "../utils/utils";
import Swipe from "./Swipe";
import { SwiperSlide } from "swiper/react";
import MediaCard from "./Card/MediaCard";

const Recommendations = ({ media, data, mediaType }) => {
  const customBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 1,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 1,
    },
    425: {
      slidesPerView: 1,
      spaceBetween: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 1,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 1,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 1,
    },
  };

  const styleProps = {
    cardSize: "w-[310px] h-[310px]",
    imgSize: "w-[310px] h-[200px]",
    contentSize: "h-[70px]",
    titleStyle: "text-sm font-semibold",
    showGenres: false,
    titleSize: "text-sm",
  dateSize: "text-sm",
  };

  return (
    <div className="">
      <p className="text-xl font-semibold mb-4">Recommendations</p>

      <>
        {data?.length === 0 ? (
          `We don't have enough data to suggest any ${capitalizeFirstLetter(
            mediaType
          )}'s based on ${media.title || media.name}.`
        ) : (
          <Swipe customBreakpoints={customBreakpoints}>
            {data?.map((media) => (
              <SwiperSlide key={media.id}>
                <MediaCard
                  media={media}
                  mediaType={mediaType}
                  srcImgUrl={getImgUrl(media.backdrop_path, "w780")}
                  truncateMediaTitle={truncateString(
                    media.title || media.name,
                    35
                  )}
                  {...styleProps}
                />
              </SwiperSlide>
            ))}
          </Swipe>
        )}
      </>
    </div>
  );
};

export default Recommendations;
