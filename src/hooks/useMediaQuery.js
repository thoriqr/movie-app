import { useQuery } from "@tanstack/react-query";
import { fetchMediaBy, fetchTrendingMedia } from "../api/themoviedbApi";

export const useTopRatedMediaQuery = (mediaType) => {
  return useQuery({
    queryKey: ["mediaTopRated", mediaType],
    queryFn: () => fetchMediaBy({ mediaType, options: "top_rated"})
  })
}

export const useMediaPopularQuery = (mediaType) => {
  return useQuery({
    queryKey: ["mediaPopular", mediaType],
    queryFn: () => fetchMediaBy({ mediaType, options: "popular" }),
  });
};

export const useMediaTrendingQuery = ({timeWindow, mediaType}) => {
  return useQuery({
    queryKey: ["mediaTrending", mediaType, timeWindow],
    queryFn: () => fetchTrendingMedia({ mediaType, timeWindow }),
  });
};