import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slider1 from "../../public/Banner/Slider1.jpg";
import slider2 from "../../public/Banner/slider-2.jpg";
import slider3 from "../../public/Banner/Slider3.jpg";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    fade: true,
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div>
          <img src={slider1} alt="" />
        </div>
        <div>
          <img src={slider2} alt="" />
        </div>
        <div>
          <img src={slider3} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
