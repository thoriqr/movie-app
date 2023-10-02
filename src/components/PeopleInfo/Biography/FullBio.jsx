/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const FullBio = ({ setOpen, biographyChunks }) => {
  return (
    <>
      <div className="absolute left-0 w-full top-0 z-50">
        <div className="bg-[#030712] text-[#F5F9FF] border border-white pr-4 pt-3 ">
          <span
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0  border border-white px-2 cursor-pointer bg-red-500"
            title="Close"
          >
            <FontAwesomeIcon size="sm" icon={faX} />
          </span>
          {biographyChunks.map((p, index) => (
            <p key={index} className="p-3">
              {p}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default FullBio;
