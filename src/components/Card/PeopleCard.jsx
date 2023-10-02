/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { getImgUrl } from "../../utils/utils";

const PeopleCard = ({ credit, mediaType }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/person/${credit.id}`)}
      className="rounded-md w-[150px] h-full group cursor-pointer"
    >
      <img
        className="rounded-t-md object-cover w-[150px] h-[185px]"
        src={getImgUrl(credit.profile_path, "w185")}
        alt={credit.name}
      />
      <div className="p-2 bg-gray-900 group-hover:bg-gray-800 w-[150px] h-full">
        <p className="text-sm font-semibold flex flex-wrap">{credit.name}</p>
        <p className="mt-1 text-sm font-extralight flex flex-wrap">
          {mediaType === "movie" ? credit?.character : ""}
          {mediaType === "tv" ? credit.roles[0].character : ""}
        </p>
        <p className="text-sm font-thin text-gray-300 flex flex-wrap">{mediaType === "tv" ? `${credit.roles[0].episode_count} Episodes` : ""}
  </p>
      </div>
    </div>
  );
};

export default PeopleCard;
