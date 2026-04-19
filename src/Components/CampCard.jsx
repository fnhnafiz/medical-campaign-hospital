import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
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
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-[420px] hover:shadow-md hover:border-emerald-200 transition-all duration-200">
      
      {/* Image + Fee Badge */}
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          alt={campName}
          className="w-full h-40 object-cover"
        />
        <span className="absolute top-2.5 left-2.5 bg-emerald-800 text-emerald-200 text-[11px] font-medium px-3 py-1 rounded-full">
          {campFees === 0 || campFees === "0" ? "Free Camp" : `$${campFees}`}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden p-4">
        
        {/* Title — max 2 lines */}
        <h2 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2 min-h-[42px]">
          {campName}
        </h2>

        {/* Description — max 2 lines */}
        <p className="text-[12px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
            <p className="text-[12px] font-medium text-gray-800 truncate">{location}</p>
          </div>
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Fees</p>
            <p className="text-[12px] font-medium text-emerald-700">
              {campFees === 0 || campFees === "0" ? "Free" : `$${campFees}`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Date</p>
            <p className="text-[12px] font-medium text-gray-800">
              {new Date(dateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Participants</p>
            <p className="text-[12px] font-medium text-gray-800">{participantCount}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between mt-auto">
          <p className="text-[11px] text-gray-500 truncate max-w-[130px]">
            {healthcareProfessional}
          </p>
          <Link to={`/campaign-details/${_id}`}>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-medium px-4 py-1.5 rounded-md transition-colors duration-150 flex-shrink-0">
              Details →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampCard;