import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import InputSearch from "../../Components/InputSearch";
import SectionTitle from "../../Components/SectionTitle";
import Pagination from "../../Components/Pagination";

const RegisterCamps = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [searchText, setSearchText] = useState("");

  const { user } = useAuth();
  // console.log(user);
  const axiosSecure = useAxiosSecure();
  const { data: registerCamps = [], refetch } = useQuery({
    queryKey: ["camps", user?.email, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/register-campaign/${user?.email}?search=${searchText}`
      );
      return res.data;
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = registerCamps?.slice(firstPostIndex, lastPostIndex);

  // Handle cancel click
  const handleCancel = async (id) => {
    // Add your cancel logic here
    console.log("Cancel for ID:", id);
    const res = await axiosSecure.delete(`/register-campaign/${id}`);
    console.log(res.data);
    if (res.data.deletedCount > 0) {
      toast.success("Remove");
      refetch();
    }
  };

  // Use react hook form
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    const feedback = {
      rating: data.rating,
      comment: data.comment,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
    };
    // console.log({ feedback });
    const res = await axiosSecure.post("/feedbacks", feedback);
    console.log(res.data);
    if (res.data.insertedId) {
      toast.success("Thanks for your feedback");
      refetch();
      // closeModal()
      handleCloseModal();
    }
  };

  // Handle payment click
  const handlePayment = (camp) => {
    // Add payment logic here
    setCampaign(camp);
    // console.log("Payment for ID:", id);
    // handlePaymentMutation(id, paymentStatus);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  // console.log(registerCamps);
  // if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <SectionTitle
        heading="Join Campaign Details"
        subHeading="Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual."
      ></SectionTitle>
      <InputSearch onSearch={setSearchText} />
      <table className="w-full text-sm text-left">
        <thead className="text-white uppercase bg-gray-600">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Camp Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Camp Fees
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Participant Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Payment Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Confirmation Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Actions
            </th>
            <th
              scope="col"
              className="px-4 py-3 border-r border-l border-green-500"
            >
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts?.map((camp) => (
            <tr key={camp._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-3 ">{camp.campName}</td>
              <td className="px-4 py-3 text-right">${camp.campFees}</td>
              <td className="px-4 py-3 text-center">{camp.participantName}</td>
              <td className="px-4 py-3 text-center">
                {camp.paymentStatus === "unpaid" ? (
                  <button
                    onClick={() => handlePayment(camp)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Pay Now
                  </button>
                ) : (
                  <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                    Paid
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    camp.confirmationStatus === "confirmed"
                      ? "text-green-700 bg-green-100"
                      : "text-yellow-700 bg-yellow-100"
                  }`}
                >
                  {camp.confirmationStatus === "confirmed"
                    ? "Confirmed"
                    : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2 text-center">
                <button
                  onClick={() => handleCancel(camp._id)}
                  disabled={camp.paymentStatus === "paid"}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    camp.paymentStatus === "paid"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Cancel
                </button>
              </td>
              <td className="text-center">
                {camp.paymentStatus === "paid" &&
                camp.confirmationStatus === "confirmed" ? (
                  <button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    // onClick={() => handleFeedback(camp._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    Feedback
                  </button>
                ) : (
                  "N/A"
                )}
              </td>
              <PaymentModal
                refetch={refetch}
                campaign={campaign}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
              ></PaymentModal>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={registerCamps.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>

      {isFeedbackModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className=" font-semibold text-gray-900 uppercase">
                  Hi{" "}
                  <span className="text-green-500 ">{user?.displayName}</span>{" "}
                  please provide your feedback
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                {/* Rating Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ratings
                  </label>
                  <input
                    {...register("rating")}
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                {/* Feedback Text Area */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    {...register("comment", { required: true })}
                    name="comment"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows="4"
                    placeholder="Please share your experience..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    // onClick={setIsFeedbackModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    // onClick={handleSubmit}
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterCamps;
