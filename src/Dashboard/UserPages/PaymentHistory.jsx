import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import SectionTitle from "../../Components/SectionTitle";
import { useState } from "react";
import Pagination from "../../Components/Pagination";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory } = useQuery({
    queryKey: [user?.email, "payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user?.email}`);
      return res.data;
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = paymentHistory?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="overflow-x-auto">
      <SectionTitle
        heading="Your Payment Histoy"
        subHeading="Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual."
      ></SectionTitle>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-green-600 to-green-800 text-white">
          <tr className="border-b ">
            <th className="px-6 py-3 text-left text-sm font-medium ">
              Campaign Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium ">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium ">
              Camp Fees
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium ">
              Confirmation Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium ">
              Payment Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts?.map((payment) => (
            <tr key={payment._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {payment.campName}
              </td>
              <td className="px-6 py-4 text-sm text-green-500">
                {payment.transactionId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                ${payment.price}
              </td>
              <td className="px-6 py-4 text-sm  text-gray-900">
                {payment.confirmationStatus === "confirmed" ? (
                  <FaCheckCircle className="text-green-500 text-center" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-center" />
                )}
              </td>
              <td className="px-6 py-4  text-sm text-gray-900">
                {payment.paymentStatus === "paid" ? (
                  <FaCheckCircle className="text-green-500 text-center" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-center" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={paymentHistory?.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default PaymentHistory;
