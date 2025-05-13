import { useState } from "react";

const FeedbackCard = ({ feedback }) => {
  const { userPhoto, userName, comment, rating } = feedback;
  //   console.log();
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle description expansion
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-center items-center">
      {/* Image */}
      <img
        referrerPolicy="no-referrer"
        className="w-20 h-20 object-cover rounded-full"
        src={userPhoto}
        alt={userName}
      />

      <div className="px-6 py-4">
        {/* User Name */}
        <div className="font-semibold text-xl text-gray-800 mb-2">
          {userName}
        </div>

        {/* Comment with description cut-off */}
        <p
          className={`text-gray-700 text-base ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {comment}
        </p>

        {/* Toggle Read More/Read Less */}
        <button
          onClick={toggleDescription}
          className="text-sm text-green-500 mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>

        {/* Rating */}
        <div className="flex items-center mt-4">
          <span className="text-yellow-500 text-xl">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
