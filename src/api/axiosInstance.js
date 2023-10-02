import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    page: "1",
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    "certification_country": "US",
    "certification": "PG-13"
  },
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + TMDB_TOKEN,
  },
});

export default axiosInstance;