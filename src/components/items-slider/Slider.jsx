import "swiper/css";
import "swiper/css/navigation";
import "./swiperEdited.css";
import { useEffect, useState } from "react";
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import { calSlidesPerView, getWindowSize } from "functions/sizes";

const config = {
  spaceBetween: 5,
  slidesPerView: 5,
  pagination: {
    clickable: true,
  },
  navigation: true,
  modules: [Navigation, Pagination, FreeMode],
};

const Slider = ({
  slidesPerViewInXl,
  slidesPerViewInLg,
  slidesPerViewInSm,
  swiperClassNames = "",
  sliderWithRadius = true,
  sliderHeight = "18vh",
  sliderBg = "18vh",
  swiperConfig = {},
  children,
}) => {
  const [windowSize, setWindowSize] = useState({ innerWidth: null });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Swiper
      {...config}
      {...swiperConfig}
      slidesPerView={
        calSlidesPerView(
          windowSize.innerWidth,
          slidesPerViewInXl || null,
          slidesPerViewInLg || null,
          slidesPerViewInSm || null
        ) || 4
      }
      className={
        !sliderWithRadius
          ? `swiper-without-radius ${swiperClassNames}`
          : swiperClassNames
      }
      style={{ height: sliderHeight, backgroundColor: sliderBg }}
    >
      {children}
    </Swiper>
  );
};

export default Slider;