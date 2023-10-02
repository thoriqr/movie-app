/* eslint-disable react/prop-types */

const ToggleMedia = ({ mediaType, setMediaType }) => {
  const toggleMediaType = (newMediaType) => {
    setMediaType(newMediaType);
  };
  return (
    <div className="flex flex-wrap bg-[#030712] text-gray-500 items-center">
      <a
        onClick={() => toggleMediaType("movie", setMediaType)}
        className={`py-1 px-2 text-xs  md:text-sm rounded-l-md font-semibold cursor-pointer ${
          mediaType === "movie" ? "bg-[#D8A31A] text-[#030712]" : "bg-[#030712]"
        }`}
      >
        Movie
      </a>
      <a
        onClick={() => toggleMediaType("tv", setMediaType)}
        className={`py-1 px-2 text-xs md:text-sm rounded-r-md font-semibold cursor-pointer ${
          mediaType === "tv" ? "bg-[#D8A31A] text-[#030712]" : "bg-[#030712]"
        }`}
      >
        TV Shows
      </a>
    </div>
  );
};

export default ToggleMedia;
