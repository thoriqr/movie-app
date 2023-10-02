/* eslint-disable react/prop-types */
import { formatDate, getImgUrl, getLanguageName } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import Trailer from "./Trailer";
import GroupDepartment from "./GroupDepartment";

const MediaInfo = ({ media, mediaType }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative md:flex gap-4 px-2">
        <div className="group md:flex ">
          <figure className="relative w-[300px] h-[450px] mx-auto">
            <img
              className="rounded-md object-cover object-center w-[300px] h-[450px]"
              src={getImgUrl(media.poster_path, "w342")}
              alt={media.title || media.name}
            />
          </figure>
        </div>
        <div className="mt-8 md:mt-0">
          <div className="flex flex-wrap text-lg lg:text-2xl gap-1 ">
            <p className="font-bold">{media?.title || media?.name}</p>
            <p className="font-extralight">
              {formatDate(media?.release_date || media.first_air_date, "year")}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mt-1 text-sm lg:text-base font-semibold">
            <p className="">
              {formatDate(media?.release_date || media.first_air_date, "full")}
            </p>
            {media?.genres.map((genre, index) => (
              <p
                className="hover:text-gray-300 cursor-pointer"
                key={genre.id}
                onClick={() =>
                  navigate(
                    `/genre/${genre.id}-${encodeURIComponent(
                      genre.name.toLowerCase().replace(/ /g, "-")
                    )}/${mediaType}`
                  )
                }
              >
                {genre.name}
                {index !== media?.genres.length - 1 && ","}
              </p>
            ))}
          </div>
          {media.runtime ? (
            <div className="flex gap-2 text-sm mt-1">
              <p className="font-semibold ">Runtime:</p>
              <p className="font-light">
                {`${Math.floor(media?.runtime / 60)}hr ${media?.runtime % 60}m`}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex mt-1 gap-2 text-sm divide-x-2 divide-gray-500">
            <div className="flex gap-1">
              <p className="font-semibold">Status:</p>
              <p className="font-light">{media?.status}</p>
            </div>
            <div className="pl-2 flex gap-1">
              <p className="font-semibold ">Original Language:</p>
              <p className="font-light">
                {getLanguageName(media?.original_language)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Trailer media={media} />
          </div>
          <div className="mt-2">
            <p className="italic text-base font-light text-stone-200">
              {media?.tagline}
            </p>
            <p className="mt-2 text-base lg:text-lg font-semibold">Overview</p>
            {media?.overview ? (
              <p className="font-light text-sm lg:text-base">
                {media?.overview}
              </p>
            ) : (
              "We don't have an overview translated in English."
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 mt-4">
              <GroupDepartment media={media} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaInfo;
