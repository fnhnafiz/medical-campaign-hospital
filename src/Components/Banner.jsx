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
        <div className="relative">
          <img src={slider1} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-5xl font-bold mb-5">Medical Campaign</h1>
            <button className="btn  text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded">
              Join with us
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={slider2} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-5xl font-bold mb-5">Medical Campaign</h1>
            <button className="btn  text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded">
              Join with us
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={slider3} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-5xl font-bold mb-5">Medical Campaign</h1>
            <button className="btn  text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded">
              Join with us
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
