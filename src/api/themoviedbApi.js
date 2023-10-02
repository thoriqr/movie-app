import axiosInstance from "./axiosInstance";

export const fetchMedia = async ({
  mediaType,
  genreIds,
  pageParam = 1,
  filterMedia,
  dateGte,
  dateLte,
}) => {
  try {
    const response = await axiosInstance.get(`discover/${mediaType}`, {
      params: {
        page: pageParam,
        sort_by: filterMedia,
        with_genres: genreIds,
        "primary_release_date.gte": dateGte,
        "primary_release_date.lte": dateLte,
        "first_air_date.gte": dateGte,
        "first_air_date.lte": dateLte,
      },
    });
    return { ...response.data, pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getGenres = async ({ mediaType }) => {
  try {
    const response = await axiosInstance.get(`genre/${mediaType}/list`);
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};

export const searchMulti = async ({ mediaType, query, pageParam }) => {
  try {
    const response = await axiosInstance.get(`search/${mediaType}`, {
      params: {
        page: pageParam,
        query: query,
      },
    });
    return { ...response.data, pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getMediaById = async ({ mediaType, mediaId }) => {
  try {
    const response = await axiosInstance.get(`${mediaType}/${mediaId}`, {
      params: {
        append_to_response: [
          "videos",
          "credits",
          "external_ids",
          "recommendations",
          "aggregate_credits",
        ].join(","),
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPersonById = async (personId) => {
  try {
    const response = await axiosInstance.get(`person/${personId}`, {
      params: {
        append_to_response: [
          "external_ids",
          "combined_credits",
          "movie_credits",
          "tv_credits",
        ].join(","),
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMediaBy = async ({ mediaType, options }) => {
  try {
    const response = await axiosInstance.get(`${mediaType}/${options}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTrendingMedia = async ({ mediaType, timeWindow }) => {
  try {
    const response = await axiosInstance.get(
      `trending/${mediaType}/${timeWindow}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
