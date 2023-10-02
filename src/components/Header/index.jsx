import { Outlet, NavLink } from "react-router-dom";
import Search from "../Search";
import NavMobile from "./NavMobile";

const Header = () => {
  const activeLink =
    "cursor-pointer flex justify-center items-center px-4 h-12 font-semibold text-lg bg-[#D8A31A] hover:bg-[#D8A31A] text-[#32343C]";
  const normalLink =
    "cursor-pointer flex justify-center items-center px-4 h-12 font-semibold text-lg bg-transparent hover:bg-[#D8A31A] hover:text-[#32343C] text-[#F5F9FF]";

  return (
    <>
      <div className=" bg-[#030712] p-0 sticky top-0 z-50 backdrop-blur-lg backdrop-filter bg-opacity-80 border-b border-[#32343C] ">
        <div className="p-2 flex justify-between w-full relative max-w-7xl mx-auto items-center">
          <div className="flex items-center">
            <div className="block md:hidden ">
              <NavMobile />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Home
            </NavLink>
          </div>

          <div className="hidden md:flex gap-1 items-center ">
            <NavLink
              to="/movie"
              end
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Movies
            </NavLink>

            <NavLink
              to="/tv"
              end
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              TV Shows
            </NavLink>
          </div>
          <Search />
        </div>
      </div>
      <div className=""></div>
      <Outlet />
    </>
  );
};

export default Header;
