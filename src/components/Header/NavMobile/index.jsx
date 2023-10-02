/* eslint-disable react/prop-types */
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const NavMobile = () => {
  const [openNav, setOpenNav] = useState(false);
  const navMobileRef = useRef();
  useEffect(() => {
    const closeOutside = (e) => {
      if (!navMobileRef.current.contains(e.target)) {
        setOpenNav(false);
      }
    };
    document.body.addEventListener("click", closeOutside);
    return () => {
      document.body.removeEventListener("click", closeOutside);
    };
  }, []);

  const activeLink =
    "font-medium w-full text-lg bg-[#D8A31A] text-[#32343C] py-4 ";
  const normalLink = "font-medium w-full text-lg py-4 ";
  
  return (
    <div className="" ref={navMobileRef}>
      <button
        onClick={() => setOpenNav(!openNav)}
        className="flex justify-center items-center px-6 h-12 text-[#F5F9FF] relative"
      >
        {openNav ? (
          <span className="absolute">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </span>
        ) : (
          <span className="absolute">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </span>
        )}
      </button>
      {/* <div className="fixed w-full h-screen top-16 left-0 bg-black opacity-50 "></div> */}
      {openNav && (
        <div className="absolute top-16 left-0 w-full bg-[#030712] text-[#F5F9FF]">
          <div className="flex flex-col text-center">
            <NavLink
              onClick={() => setOpenNav(false)}
              to="/movie"
              end
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Movies
            </NavLink>

            <NavLink
              onClick={() => setOpenNav(false)}
              to="/tv"
              end
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              TV Shows
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
