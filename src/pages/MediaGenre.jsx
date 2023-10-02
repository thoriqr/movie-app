import { useParams } from "react-router-dom"
import { fetchMedia } from "../api/themoviedbApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../utils/utils";
import MediaCard from "../components/Card/MediaCard";

const MediaGenre = () => {
  const { genreId, mediaType } = useParams();
  const [parsedGenreId] = genreId.split("-");

  const {data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage,} = useInfiniteQuery({
    queryKey: ["mediaGenre", mediaType, genreId],
    queryFn: ({ pageParam = 1 }) =>
      fetchMedia({
        mediaType: mediaType,
        genreIds: parsedGenreId,
        pageParam
      }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageParam + 1;
      if (nextPage > lastPage.total_pages) {
        return undefined; // Stop fetching
      }
      return nextPage;
    },
  });
  console.log(data);

  const genreUrlParams = genreId.split("-")
  const genreName = capitalizeFirstLetter(genreUrlParams[1])
  console.log(genreName);

  
  console.log(parsedGenreId, mediaType);
  return (
    <div className="max-w-7xl mx-auto">
      <div>
      <p>{genreName}</p>
      <div>
        {data?.pages.map((page, pageNumber) => (
          <div key={pageNumber}>
            {page?.results.map((media) => (
              <MediaCard key={media.id} media={media} mediaType={mediaType} />
            ))}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default MediaGenre