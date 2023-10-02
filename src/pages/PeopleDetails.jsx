import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPersonById } from "../api/themoviedbApi";
import Swipe from "../components/Swipe";
import { SwiperSlide } from "swiper/react";
import MediaCard from "../components/Card/MediaCard";
import Loading from "../components/Loading";
import PeopleInfo from "../components/PeopleInfo";
import { getImgUrl, truncateString } from "../utils/utils";

const PeopleDetails = () => {
  const { personId } = useParams();
  const {
    data: person,
    status,
    error,
  } = useQuery({
    queryKey: ["peopleDetails", personId],
    queryFn: () => getPersonById(personId),
  });

  // Sorted vote_count descended
  const sortedCredits = person?.combined_credits.cast
    .concat(person?.combined_credits.crew) // Combine cast and crew arrays
    .sort((a, b) => b.vote_count - a.vote_count);

  // store unique titles/names
  const uniqueTitlesOrNames = new Set();

  const knownFor = sortedCredits?.filter((credit) => {
    // Generate a key by concatenating 'title' and 'name'
    const key = `${credit.id}${credit.title}${credit.name}`;

    if (!uniqueTitlesOrNames.has(key)) {
      // If the key is not in the Set, add it and keep the credit
      uniqueTitlesOrNames.add(key);
      return true;
    }

    // If the key is already in the Set, skip the credit
    return false;
  });

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
    cardSize: "w-[180px] h-[310px]",
    imgSize: "w-[180px] h-[240px]",
    contentSize: "h-[70px]",
    titleSize: "text-sm font-semibold",
    dateSize: "text-sm",
    showGenres: false,
  };

  console.log(person);
  return (
    <>
      {status === "loading" ? (
        <Loading height="h-screen" />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="max-w-full xl:max-w-7xl xl:mx-auto mt-4 text-[#F5F9FF] h-screen">
          <div className="md:flex gap-4 px-2 w-full">
            <div className="">
              <figure className="w-[300px] h-[450px] mx-auto">
                <img
                  className="rounded-md object-cover object-center w-[300px] h-[450px]"
                  src={getImgUrl(person?.profile_path, "h632")}
                  alt=""
                />
              </figure>
            </div>
            <div className="mt-4">
              <p className="text-lg lg:text-2xl font-bold">{person?.name}</p>
              <PeopleInfo person={person} />
            </div>
          </div>
          <div className="mt-4 px-2">
            <p className="text-lg font-semibold mb-3">Known For</p>
            <Swipe customBreakpoints={customBreakpoints}>
              {knownFor?.slice(0, 15).map((media) => (
                <SwiperSlide key={media.id}>
                  <MediaCard
                    media={media}
                    mediaType={media.media_type}
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
          </div>
        </div>
      )}
    </>
  );
};

export default PeopleDetails;
