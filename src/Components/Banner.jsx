import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slider1 from "../../public/Banner/Slider1.jpg";
import slider2 from "../../public/Banner/slider-2.jpg";
import slider3 from "../../public/Banner/Slider3.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
  {
    img: slider1,
    badge: "Healthcare Volunteering",
    accent: "Make an Impact Today",
    title: "Volunteer and Save Lives",
    desc: "Your time and dedication can help deliver much-needed healthcare services to those who need them the most. Join our compassionate team today.",
    btnLabel: "Volunteer Now",
    btnClass:
      "bg-emerald-700 hover:bg-emerald-800 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]",
    overlayClass: "bg-gradient-to-br from-emerald-900/80 to-black/50",
    stats: [
      { num: "12K+", label: "Volunteers" },
      { num: "85", label: "Countries" },
      { num: "2M+", label: "Lives Touched" },
    ],
    to: null,
  },
  {
    img: slider2,
    badge: "Medical Mission",
    accent: "Be Part of Something Bigger",
    title: "Join Our Medical Mission",
    desc: "Be part of a life-changing initiative that provides essential healthcare to underserved communities. Together, we can make a real difference.",
    btnLabel: "Join Now",
    btnClass:
      "bg-orange-700 hover:bg-orange-800 shadow-[0_0_0_3px_rgba(59,130,246,0.35)]",
    overlayClass: "bg-gradient-to-br from-blue-900/80 to-black/50",
    stats: [
      { num: "340+", label: "Clinics" },
      { num: "500K", label: "Patients" },
      { num: "18 Yrs", label: "Experience" },
    ],
    to: "/login",
  },
  {
    img: slider3,
    badge: "Donate & Support",
    accent: "Your Generosity Saves Lives",
    title: "Support Our Cause",
    desc: "Your generous contributions help us reach more people and deliver quality healthcare services where they are needed the most.",
    btnLabel: "Register Now",
    btnClass:
      "bg-red-700 hover:bg-red-800 shadow-[0_0_0_3px_rgba(239,68,68,0.35)]",
    overlayClass: "bg-gradient-to-br from-red-900/80 to-black/50",
    stats: [
      { num: "$4.2M", label: "Raised" },
      { num: "98%", label: "To Programs" },
      { num: "60K+", label: "Donors" },
    ],
    to: "/register",
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    fade: true,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  return (
    <div className="mt-[46px]">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i}>
            <div className="relative w-full h-[520px] md:h-[620px] sm:h-[380px] overflow-hidden rounded-b-xl">
              {/* Background image */}
              <img
                src={slide.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 `} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-[7%] z-10 max-w-4xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/35 bg-white/10 text-white text-xs font-medium uppercase tracking-widest w-fit mb-5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-white font-bold leading-tight mb-3">
                  <span className="block text-white/70 text-base md:text-lg font-normal mb-1">
                    {slide.accent}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl">
                    {slide.title}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-lg">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  {slide.to ? (
                    <Link to={slide.to}>
                      <button
                        className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold tracking-wide ${slide.btnClass}`}
                      >
                        {slide.btnLabel} →
                      </button>
                    </Link>
                  ) : (
                    <button
                      className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold tracking-wide ${slide.btnClass}`}
                    >
                      {slide.btnLabel} →
                    </button>
                  )}
                  <button className="px-5 py-2.5 rounded-md text-white/90 text-sm font-medium border border-white/35 bg-white/10 hover:bg-white/20 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
