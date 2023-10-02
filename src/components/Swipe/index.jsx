/* eslint-disable react/prop-types */
import { Swiper} from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Swipe = ({ children, customBreakpoints }) => {
  return (
    <Swiper
      className="mySwiper w-full"
      slidesPerView={1}
      navigation={{
        nextEl: ".image-swiper-button-next",
        prevEl: ".image-swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }}
      spaceBetween={1}
      breakpoints={customBreakpoints}
      modules={[Navigation]}     
    >
      {children}
      <div className="swiper-button image-swiper-button-next">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className="swiper-button image-swiper-button-prev">
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </Swiper>
  );
};

export default Swipe;
