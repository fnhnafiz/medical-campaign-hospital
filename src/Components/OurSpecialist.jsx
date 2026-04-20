import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SectionTitle from "./SectionTitle";

const doctors = [
  {
    name: "Dr. James Carter",
    specialty: "Cardiologist",
    subSpecialty: "Interventional Cardiology",
    experience: "14+",
    patients: "3.2K",
    rating: "4.9",
    availability: "Mon, Wed, Fri",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Neurologist",
    subSpecialty: "Clinical Neurology",
    experience: "10+",
    patients: "2.8K",
    rating: "4.8",
    availability: "Tue, Thu, Sat",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Dr. Michael Adeyemi",
    specialty: "Orthopedic",
    subSpecialty: "Orthopedic Surgery",
    experience: "8+",
    patients: "1.9K",
    rating: "4.7",
    availability: "Mon, Tue, Thu",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Dr. Sarah Nguyen",
    specialty: "Pediatrician",
    subSpecialty: "Pediatric Medicine",
    experience: "12+",
    patients: "4.1K",
    rating: "5.0",
    availability: "Wed, Fri, Sat",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Dr. Ahmed Hassan",
    specialty: "Dermatologist",
    subSpecialty: "Clinical Dermatology",
    experience: "9+",
    patients: "2.1K",
    rating: "4.8",
    availability: "Mon, Wed, Sat",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Dr. Linda Park",
    specialty: "Gynecologist",
    subSpecialty: "Obstetrics & Gynecology",
    experience: "11+",
    patients: "3.5K",
    rating: "4.9",
    availability: "Tue, Thu, Fri",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80&auto=format&fit=crop&crop=top",
  },
];

// ─── Appointment Modal ────────────────────────────────────────
const AppointmentModal = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Appointment booked with ${doctor.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-10 h-10 rounded-full object-cover object-top border-2 border-emerald-100"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{doctor.name}</p>
              <p className="text-xs text-emerald-600">{doctor.subSpecialty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <IoClose className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Your full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+880 1XXX-XXXXXX"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Preferred date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Preferred time</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-400 transition-colors"
              >
                <option value="">Select</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Reason for visit</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Briefly describe your symptoms or reason..."
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3.5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <p className="text-xs text-emerald-800">
              {doctor.name} is available on{" "}
              <span className="font-medium">{doctor.availability}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors duration-150"
          >
            Confirm appointment
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Doctor Card ──────────────────────────────────────────────
const DoctorCard = ({ doctor, onBook }) => {
  const { name, specialty, subSpecialty, experience, patients, rating, availability, image } = doctor;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-300 hover:-translate-y-1 transition-all duration-200">

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-emerald-50 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover object-top" />
        <span className="absolute bottom-2.5 left-2.5 bg-emerald-800 text-emerald-200 text-[11px] font-medium px-3 py-1 rounded-full">
          {specialty}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[14px] font-medium text-gray-900 mb-0.5">{name}</p>
        <p className="text-[12px] text-emerald-700 mb-3">{subSpecialty}</p>

        {/* Stats */}
        <div className="flex gap-3 mb-3">
          <div>
            <p className="text-[13px] font-medium text-gray-900">{experience}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Yrs exp.</p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-gray-900">{patients}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Patients</p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-gray-900">{rating}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Rating</p>
          </div>
        </div>

        {/* Availability */}
        <div className="border-t border-gray-100 pt-3 mb-3">
          <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            Available {availability}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => onBook(doctor)}
          className="mt-auto w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-medium rounded-lg transition-colors duration-150"
        >
          Book appointment
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────
const OurSpecialist = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <section className="py-6 px-4 ">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <SectionTitle
            heading="Our Specialists"
            subHeading="Meet our board-certified doctors dedicated to providing compassionate, world-class healthcare across every specialty."
          />
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          speed={600}
          spaceBetween={20}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.name}>
              <DoctorCard doctor={doctor} onBook={setSelectedDoctor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </section>
  );
};

export default OurSpecialist;