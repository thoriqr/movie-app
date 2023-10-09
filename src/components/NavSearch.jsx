import { NavLink, Outlet, useSearchParams } from "react-router-dom";

const NavSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const activeLink = "border-b-4 border-gray-300 text-[#F5F9FF] w-full py-2";
  const normalLink = "text-gray-500 hover:text-gray-300 w-full py-2 border-b-4 border-gray-800";
  return (
    <div className="max-w-full xl:max-w-7xl xl:mx-auto px-2">
      <div className="flex gap-1 text-sm lg:text-base text-gray-200 mt-4 ">
        <p className="font-medium">Search Results for</p>
        <p className="italic">{`"${query}"`}</p>
      </div>
      <div className="mt-4">
        <div className="flex max-w-5xl mx-auto text-center font-semibold text-base">
          <NavLink
            to={`/search/multi?query=${query}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            end
          >
            All
          </NavLink>

          <NavLink
            to={`/search/person?query=${query}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            end
          >
            People
          </NavLink>
          <NavLink
            to={`/search/movie?query=${query}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            end
          >
            Movie
          </NavLink>
          <NavLink
            to={`/search/tv?query=${query}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            end
          >
            TV Shows
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default NavSearch;
