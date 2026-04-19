import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "./LoadingSpinner";
import ParticipantModal from "./ParticipantModal";
import { useEffect, useState } from "react";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const CampaingDetails = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: campDetails = {},
    refetch,
    isLoading,
  } = useQuery({
    querykey: [id, "camp"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/available-camp/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const initials = campDetails.healthcareProfessional
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="pt-[50px] min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Hero Image with overlay title */}
          <div className="relative h-64 md:h-[500px] overflow-hidden">
            <img
              src={campDetails.imageUrl}
              alt={campDetails.campName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6">
              <span className="inline-block bg-emerald-800 text-emerald-200 text-[11px] font-medium px-3 py-1 rounded-full mb-2">
                {campDetails.campFees === 0 || campDetails.campFees === "0"
                  ? "Free Camp"
                  : `$${campDetails.campFees}`}
              </span>
              <h1 className="text-white text-xl font-semibold leading-snug">
                {campDetails.campName}
              </h1>
            </div>
          </div>

          <div className="p-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              <div className="bg-gray-50 rounded-xl px-3 py-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-[13px] font-medium text-gray-800 truncate">
                  {campDetails.location}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  Date & time
                </p>
                <p className="text-[13px] font-medium text-gray-800">
                  {new Date(campDetails.dateTime).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-[11px] text-gray-500">
                  {new Date(campDetails.dateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  Participants
                </p>
                <p className="text-[13px] font-medium text-gray-800">
                  {campDetails.participantCount}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                  Camp fees
                </p>
                <p className="text-[13px] font-medium text-emerald-700">
                  {campDetails.campFees === 0 || campDetails.campFees === "0"
                    ? "Free"
                    : `$${campDetails.campFees}`}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                About this camp
              </p>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {campDetails.description}
              </p>
            </div>

            {/* Healthcare Professional */}
            <div className="border-t border-gray-100 pt-4 mb-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">
                Healthcare professional
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[13px] font-medium text-emerald-700 flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-900">
                    {campDetails.healthcareProfessional}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Medical Professional
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons — functionality unchanged */}
            <div className="flex items-center gap-3">
              <button
                disabled={isAdmin && user}
                onClick={() => {
                  openModal();
                  !user && navigate("/login");
                }}
                className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium text-white transition-colors duration-150 ${
                  isAdmin && user
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                Join camp
              </button>
              <Link to="/">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                  <FaArrowLeft className="w-3 h-3" />
                  Back to home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal — unchanged */}
      <ParticipantModal
        refetch={refetch}
        campDetails={campDetails}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default CampaingDetails;
