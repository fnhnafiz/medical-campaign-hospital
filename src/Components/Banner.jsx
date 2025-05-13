import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slider1 from "../../public/Banner/Slider1.jpg";
import slider2 from "../../public/Banner/slider-2.jpg";
import slider3 from "../../public/Banner/Slider3.jpg";
import { Link } from "react-router-dom";

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
        <div className="relative mt-[46px]">
          <img src={slider1} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 p-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Volunteer and Save Lives
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              Your time and dedication can help deliver much-needed healthcare
              services to those who need them the most. Join our team today!
            </p>
            <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium bg-green-500 hover:bg-green-600 rounded shadow">
              Volunteer Now
            </button>
          </div>
        </div>
        <div className="relative mt-[46px]">
          <img src={slider2} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 p-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Join Our Medical Mission
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              Be part of a life-changing initiative that provides essential
              healthcare to underserved communities. Together, we can make a
              difference!
            </p>
            <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded shadow">
              Join Now
            </button>
          </div>
        </div>
        <div className="relative mt-[46px]">
          <img src={slider3} alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 p-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Support Our Cause
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              Your generous contributions help us reach more people and deliver
              quality healthcare services where they are needed most.
            </p>
            <Link to="/register">
              <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium bg-red-500 hover:bg-red-600 rounded shadow">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
