import { useNavigate, useSearchParams } from "react-router-dom";
import {
  SwipeTopRated,
  SwipePopular,
  SwipeTrending,
  TrendingBanner,
} from "../components/SwipeContent";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get("query");
  const [query, setQuery] = useState(queryParams || "");

  const handleInputChange = (event) => {
    event.preventDefault();
    const query = event.target.value.toLowerCase();
    setQuery(query);
  };

  const handleSearch = () => {
    navigate(`/search/multi?query=${query}`);
    setQuery("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-full lg:max-w-7xl lg:mx-auto">
      <div className="relative">
        <TrendingBanner />
        <div className="absolute top-0 z-20 w-full text-[#F5F9FF]">
          <div className="pt-36 px-4 md:pt-60 md:px-12">
            <h1 className="font-bold text-3xl md:text-5xl">Welcome</h1>
            <h2 className="font-bold text-xl md:text-2xl pt-2">
              Millions of movies, TV shows to discover. Explore now.
            </h2>
            <div className="w-full mt-5 flex">
              <input
                type="text"
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
                placeholder="Search for a movie, tv show..."
                className="p-2 rounded-l-sm focus:outline-none w-full bg-[#F5F9FF] text-[#32343C] font-semibold text-base md:text-lg placeholder:italic placeholder:font-normal"
              />

              <button
                onClick={handleSearch}
                className="p-2 text-sm md:text-base bg-[#32343C] text-[#F5F9FF] border-2 border-[#F5F9FF] hover:border-[#F5F9FF] rounded-r-sm font-medium"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4 px-2 text-[#F5F9FF]">
        <SwipeTrending />
        <SwipePopular />
        <SwipeTopRated />
      </div>
    </div>
  );
};

export default Home;
