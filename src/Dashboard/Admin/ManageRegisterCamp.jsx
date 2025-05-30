import { FaCheck } from "react-icons/fa";
// import LoadingSpinner from "../../Components/LoadingSpinner";
import { MdPending } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import useRegister from "../../Hooks/useRegister";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import InputSearch from "../../Components/InputSearch";
import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import Pagination from "../../Components/Pagination";
// import LoadingSpinner from "../../Components/LoadingSpinner";

const ManageRegisterCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState();
  const [registerCampaign, , refetch] = useRegister(searchText);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = registerCampaign.slice(firstPostIndex, lastPostIndex);

  // console.log("I am current post", currentPosts);

  // Handle confirmation status change
  const handleConfirmation = async (id, updateStatus) => {
    // Add your confirmation logic here
    console.log("Confirm registration:", id, updateStatus);
    const res = await axiosSecure.patch(`/register-campaign/${id}`, {
      confirmationStatus: updateStatus,
    });
    // console.log("I confirmation status ", res.data);
    if (res.data.modifiedCount > 0) {
      // console.log("I am updated status", res.data);
      toast.success("Confirm Successfully!!");
      await axiosSecure.patch(`/update-payment-history/${id}`, {
        confirmationStatus: updateStatus,
      });
      refetch();
    }
  };

  // Handle cancel registration
  const handleCancel = async (item) => {
    const { participantEmail, campName, _id, participantName } = item;
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be see this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Add your cancel logic here
        // console.log("Cancel registration:", id);
        const res = await axiosSecure.delete(`/register-campaign/${_id}`);

        const userData = {
          name: participantName,
          email: participantEmail,
          message: `your ${campName} has been rejected for pending`,
        };
        const trashData = await axiosSecure.post(
          `/deleted-trash-data`,
          userData
        );
        // console.log(trashData.data);

        if (res.data.deletedCount > 0 && trashData.data.insertedId) {
          Swal.fire({
            title: "Deleted!",
            text: "Deleted pending data and send to the notification user",
            icon: "success",
          });
          // toast.success("Deleted Campaign");
          refetch();
        }
      }
    });
  };

  // console.log(registerCampaign);
  // if (isPending) return <LoadingSpinner />;
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <SectionTitle
        heading="Here is All Join Campaign Information"
        subHeading="Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual."
      ></SectionTitle>
      <InputSearch onSearch={setSearchText} />
      <table className="w-full ">
        <thead className="bg-gradient-to-r from-gray-600 to-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Participant Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Camp Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Camp Fees
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Payment Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Confirmation Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentPosts.map((registration) => (
            <tr key={registration._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {registration.participantName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {registration.campName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                ${registration.campFees}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                    registration.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {registration.paymentStatus === "paid" ? (
                    <>
                      <FaCheck className="text-green-600" />
                      Paid
                    </>
                  ) : (
                    <>
                      <MdPending className="text-yellow-600" />
                      Unpaid
                    </>
                  )}
                </span>
              </td>

              <td
                className={`px-4 py-3 border-x border-gray-200 ${
                  registration?.confirmationStatus === "confirmed"
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <select
                  disabled={
                    registration?.confirmationStatus === "confirmed" ||
                    registration?.paymentStatus === "unpaid"
                  }
                  className={`w-full rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${
                    registration?.confirmationStatus === "confirmed"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-white hover:bg-gray-100 border-gray-300"
                  } border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                  defaultValue={registration?.confirmationStatus}
                  onChange={(e) =>
                    handleConfirmation(registration._id, e.target.value)
                  }
                  name="status"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirm</option>
                </select>
              </td>
              <td className="px-6 py-4 text-sm">
                {registration.paymentStatus === "paid" &&
                registration.confirmationStatus === "confirmed" ? (
                  <button
                    disabled={
                      registration.paymentStatus === "paid" &&
                      registration.confirmationStatus === "confirmed"
                    }
                    className={`${
                      registration.paymentStatus === "paid" &&
                      registration.confirmationStatus === "confirmed"
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-900"
                    } font-medium p-1 hover:bg-red-50 rounded-full transition-colors flex gap-2`}
                  >
                    <FaCheck className="text-xl text-green-600" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(registration)}
                    className="text-red-600 hover:text-red-900 font-medium p-1 hover:bg-red-50 rounded-full transition-colors flex gap-2"
                  >
                    <RxCross2 className="text-xl" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={registerCampaign.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default ManageRegisterCamp;
