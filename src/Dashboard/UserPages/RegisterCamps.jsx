import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import toast from "react-hot-toast";

const RegisterCamps = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: registerCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-campaign/${user?.email}`);
      return res.data;
    },
  });

  // const { mutate: handlePaymentMutation } = useMutation({
  //   mutationFn: async (id, paymentStatus) => {
  //     const res = await axiosSecure.patch(
  //       `/participant-payment/${id}?paymentStatus=${paymentStatus}`
  //     );
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     // Refetch the camps data after successful payment
  //     QueryClient.invalidateQueries(["camps", user?.email]);
  //   },
  // });

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

  // Handle feedback click
  const handleFeedback = (id) => {
    // Add your feedback logic here
    console.log("Feedback for ID:", id);
  };

  // Handle payment click
  const handlePayment = (id) => {
    // Add your payment logic here
    console.log("Payment for ID:", id);
    // handlePaymentMutation(id, paymentStatus);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Add your payment processing logic here
    handleCloseModal();
  };

  console.log(registerCamps);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-white uppercase bg-blue-600">
          <tr>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Camp Name
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Camp Fees
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Participant Name
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Payment Status
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Confirmation Status
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Actions
            </th>
            <th scope="col" className="px-4 py-3 border-r border-red-500">
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {registerCamps?.map((camp) => (
            <tr key={camp._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-3">{camp.campName}</td>
              <td className="px-4 py-3">${camp.campFees}</td>
              <td className="px-4 py-3">{camp.participantName}</td>
              <td className="px-4 py-3">
                {camp.paymentStatus === "unpaid" ? (
                  <button
                    onClick={() => handlePayment(camp._id)}
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
              <td className="px-4 py-3">
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
              <td className="px-4 py-3 space-x-2">
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
                    onClick={() => handleFeedback(camp._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    Feedback
                  </button>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Payment Modal */}
      {isModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handlePaymentSubmit} className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Pay Now
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
