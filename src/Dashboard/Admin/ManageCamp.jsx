import { FaEdit, FaTrash } from "react-icons/fa";
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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Camp Name</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Healthcare Professional</th>
            <th>Update Action</th>
            <th>Remove Campaign</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {campaign?.map((camp) => (
            <tr key={camp._id}>
              <td> {camp?.campName}</td>
              <td className="flex gap-1">
                {" "}
                <p>{new Date(camp?.dateTime).toLocaleDateString()} </p>||
                <p>{new Date(camp?.dateTime).toLocaleTimeString()}</p>
              </td>
              <td>{camp?.location}</td>
              <td>{camp?.healthcareProfessional}</td>
              <td className="">
                <Link to={`/dashboard/update-camp/${camp._id}`}>
                  <button className="flex items-center gap-1">
                    Update <FaEdit />
                  </button>
                </Link>
              </td>
              <td>
                <Link>
                  <button
                    onClick={() => handleCampaignDelete(camp._id)}
                    className="flex items-center gap-1"
                  >
                    Delete <FaTrash />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCamp;
