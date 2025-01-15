import { useQuery } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "./LoadingSpinner";
import ParticipantModal from "./ParticipantModal";
import { useState } from "react";

const CampaingDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { data: campDetails = {}, isLoading } = useQuery({
    querykey: ["campDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/available-camp/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  //   console.log(campDetails);

  return (
    <div className="pt-12">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-5">
        <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full">
          {/* Left Side Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={campDetails.imageUrl}
              alt={campDetails.campName}
              className="w-full h-72 lg:h-full object-cover"
            />
          </div>

          {/* Right Side Content */}
          <div className="p-6 lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {campDetails.campName}
            </h1>
            <p className="text-gray-600 text-base mb-6">
              {campDetails.description}
            </p>

            {/* Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>
                  <strong>Location:</strong> {campDetails.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserMd className="text-green-500" />
                <span>
                  <strong>Healthcare Professional:</strong>{" "}
                  {campDetails.healthcareProfessional}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-orange-500" />
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(campDetails.dateTime).toLocaleDateString()} <br />
                  <strong>Time:</strong>{" "}
                  {new Date(campDetails.dateTime).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-purple-500" />
                <span>
                  <strong>Participants:</strong> {campDetails.participantCount}
                </span>
              </div>
            </div>

            {/* Fees Section */}
            <p className="text-lg font-semibold text-gray-700 mb-6">
              <strong>Fees:</strong> ${campDetails.campFees}
            </p>

            {/* Join Button */}
            <div className="text-center lg:text-left">
              <button
                onClick={openModal}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
              >
                Join Camp
              </button>
              <ParticipantModal
                isOpen={isModalOpen}
                closeModal={closeModal}
              ></ParticipantModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaingDetails;
