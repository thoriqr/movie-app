/* eslint-disable react/prop-types */
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactPlayer from "react-player";

const Trailer = ({ media }) => {
  const [playing, setPlaying] = useState(false);
  const trailer =
    media?.videos.results.find((video) => video.name === "Official Trailer") ||
    media?.videos.results[0] ||
    undefined;
  return (
    <>
      <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
      <p className="font-bold text-sm lg:text-base">{media?.vote_average.toFixed(1)}</p>
      <p className="font-extralight text-sm lg:text-base">/ 10</p>
      <div className="ml-2 text-sm lg:text-base">
        {trailer ? (
          <button
            className="font-normal hover:text-gray-300"
            onClick={() => setPlaying(true)}
          >
            <p className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faPlay} />
              Play Trailer
            </p>
          </button>
        ) : (
          <p className="font-normal rounded-sm px-2 bg-[#030712]">
            No Trailer available
          </p>
        )}
        {playing && (
          <div className="">
            <ReactPlayer
              className="absolute m-auto top-0 left-0 right-0
                  "
              url={`https://www.youtube.com/watch?v=${trailer?.key}`}
              // width="100%"
              // height="100%"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Trailer;
