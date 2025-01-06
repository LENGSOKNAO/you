import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <>
  

      {/* <!-- Hero Slider Begin --> */}
      <section className="hero-slider">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]} // Ensure these are passed correctly
          className="hero-items"
        >
          <SwiperSlide>
            <div
              className="single-slider-item set-bg"
              style={{ backgroundImage: "url('./src/img/slider-1.jpg')" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h1>2019</h1>
                    <h2>Lookbook.</h2>
                    <a href="#" className="primary-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="single-slider-item set-bg"
              style={{ backgroundImage: "url('./src/img/slider-2.jpg')" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">/
                    <h1>2019</h1>
                    <h2>Lookbook.</h2>
                    <a href="#" className="primary-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="single-slider-item set-bg"
              style={{ backgroundImage: "url('./src/img/slider-3.jpg')" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h1>2019</h1>
                    <h2>Lookbook.</h2>
                    <a href="#" className="primary-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};

export default Banner;
