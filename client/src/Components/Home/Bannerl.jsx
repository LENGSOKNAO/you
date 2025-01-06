import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Bannerl = () => {
  return (
    <div className="logo-section spad">
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="logo-items"
      >
        <SwiperSlide>
          <div className="logo-item">
            <img src="./src/img/logos/logo-1.png" alt="Logo 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="logo-item">
            <img src="./src/img/logos/logo-2.png" alt="Logo 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="logo-item">
            <img src="./src/img/logos/logo-3.png" alt="Logo 3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="logo-item">
            <img src="./src/img/logos/logo-4.png" alt="Logo 4" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="logo-item">
            <img src="./src/img/logos/logo-5.png" alt="Logo 5" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Bannerl;
