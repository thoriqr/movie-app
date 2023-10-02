/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { truncateString } from "../../../utils/utils";
import FullBio from "./FullBio";

const Biography = ({ person }) => {
  const [biographyChunks, setBiographyChunks] = useState([]);
  const [chunksToShow] = useState(1);

  useEffect(() => {
    if (person && person.biography) {
      const fullBiography = person.biography;
      const chunks = fullBiography.split("\n\n");

      const resultBiography = [];

      chunks.map((chunk) => {
        resultBiography.push(chunk);
        // console.log(index, chunk); // Push the chunk into the result
      });
      setBiographyChunks(resultBiography);
    }
  }, [person]);

  const [open, setOpen] = useState(false);
  const bioRef = useRef();
  useEffect(() => {
    const closeOutside = (e) => {
      if (!bioRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", closeOutside);
    return () => {
      document.body.removeEventListener("click", closeOutside);
    };
  }, []);

  // console.log(biographyChunks);

  
  return (
    <div className="" ref={bioRef}>
      <p className="text-base lg:text-lg font-semibold">Biography</p>
      {person?.biography ? (
        <div className="text-sm lg:text-base">
          {!open || person.biography.length < 300
            ? biographyChunks.map(
                (p, index) =>
                  index < chunksToShow && (
                    <p key={index} className="pt-4">
                      {/* {p}{console.log} */}
                      {truncateString(p, 300)}
                    </p>
                  )
              )
            : biographyChunks.map(
                (p, index) =>
                  index < chunksToShow && (
                    <p key={index} className="pt-4">
                      {/* {p}{console.log} */}
                      {truncateString(p, 300)}
                    </p>
                  )
              )}
          {person?.biography.length > 300 && (
            <button
              className="cursor-pointer text-xs bg-gray-700 px-2 rounded-sm"
              onClick={() => setOpen(!open)}
              title="Full Biography"
            >
              Read All
            </button>
          )}
        </div>
      ) : (
        `We don't have a biography for ${person?.name}`
      )}
      {open && (
        <FullBio
          open={open}
          setOpen={setOpen}
          biographyChunks={biographyChunks}
        />
      )}
      
    </div>
  );
};

export default Biography;
