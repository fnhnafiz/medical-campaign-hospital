import {
  FaClock,
  FaEdit,
  FaMapMarkerAlt,
  FaTrash,
  FaUserMd,
} from "react-icons/fa";
import useCampaings from "../../Hooks/useCampaings";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCamp = () => {
  const [campaign, , refetch] = useCampaings();
  // console.log(campaign);
  const axiosSecure = useAxiosSecure();

  const handleCampaignDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/camps/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Camp Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Location
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Healthcare Professional
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {campaign?.map((camp) => (
            <tr
              key={camp._id}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-6 py-4">
                <span className="font-medium text-gray-800">
                  {camp?.campName}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-blue-500" />
                  <div className="flex flex-col">
                    <span>{new Date(camp?.dateTime).toLocaleDateString()}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(camp?.dateTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" />
                  {camp?.location}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUserMd className="text-green-500" />
                  {camp?.healthcareProfessional}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/dashboard/update-camp/${camp._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  >
                    <button className="flex items-center gap-2 font-medium">
                      <FaEdit className="text-lg" />
                      <span className="hidden sm:inline">Update</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleCampaignDelete(camp._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200 flex items-center gap-2 font-medium"
                  >
                    <FaTrash className="text-lg" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCamp;
