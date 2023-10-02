/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../api/themoviedbApi";
import { formatDate } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";

const MediaCard = ({
  media,
  mediaType,
  showGenres,
  cardSize,
  imgSize,
  contentSize,
  titleSize,
  dateSize,
  srcImgUrl,
  truncateMediaTitle,
}) => {
  const navigate = useNavigate();
  const { data: genres } = useQuery({
    queryFn: () => getGenres({ mediaType: mediaType }),
    queryKey: ["genres", mediaType],
  });

  const MAX_GENRES = 4; // Maximum number of genres to display

  const genreNames = media?.genre_ids.slice(0, MAX_GENRES).map((genreId) => {
    const genre = genres?.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  });

  let genreNamesString = genreNames.join(", ");

  // Add ellipsis if there are more genres not shown
  if (media?.genre_ids.length > MAX_GENRES) {
    genreNamesString += " ...";
  }

  return (
    <div className={`rounded-md ${cardSize}`}>
      <div
        onClick={() => navigate(`/${mediaType}/${media.id}`)}
        className="mb-4 shadow-xl group cursor-pointer"
        title={media.title || media.name}
      >
        <img
          className={`rounded-t-md object-cover object-center ${imgSize}`}
          src={srcImgUrl}
          alt={media.title || media.name}
        />

        <div
          className={`items-center p-2 bg-gray-900 group-hover:bg-gray-800 text-white font-Inter font-medium ${contentSize} `}
        >
          <p className={`font-semibold ${titleSize}`}>
            {media.title || media.name ? truncateMediaTitle : ""}
          </p>
          <div className={`${dateSize}`}>
            <p className="font-semibold pt-1">
              {formatDate(media.release_date || media.first_air_date, "full")}
            </p>
            {showGenres && (
              <p className="font-extralight pt-1">{genreNamesString}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
