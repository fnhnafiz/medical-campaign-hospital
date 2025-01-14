import { FaEdit, FaTrash } from "react-icons/fa";
import useCampaings from "../../Hooks/useCampaings";
import { Link } from "react-router-dom";

const ManageCamp = () => {
  const [campaign] = useCampaings();
  console.log(campaign);
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
                <Link className="flex items-center gap-1">
                  <button>Update</button>
                  <span>
                    <FaEdit />
                  </span>
                </Link>
              </td>
              <td>
                <Link className="flex items-center gap-1 ">
                  {" "}
                  <button className="">Delete</button>
                  <span>
                    <FaTrash />
                  </span>
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
