import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
  //   console.log(camp);
  const {
    campFees,
    campName,
    dateTime,
    description,
    healthcareProfessional,
    imageUrl,
    location,
    participantCount,
    _id,
  } = camp;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 duration-300 p-4 border-2 border-gray-200 ">
      <img
        src={imageUrl}
        alt={campName}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="py-2">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          {campName}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            <strong>Location:</strong> {location}
          </span>
          <span>
            <strong>Fees:</strong> ${campFees}
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <strong>Date:</strong> {new Date(dateTime).toLocaleDateString()}{" "}
          <br />
          <strong>Time:</strong> {new Date(dateTime).toLocaleTimeString()}
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <strong>Healthcare Professional:</strong> {healthcareProfessional}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            <strong>Participants:</strong> {participantCount}
          </span>
          <div className="">
            <Link to={`/campaign-details/${_id}`}>
              <button className="bg-gray-100 text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:border-green-600 transition">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
