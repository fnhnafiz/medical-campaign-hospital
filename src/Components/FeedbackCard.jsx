import { useState } from "react";

const FeedbackCard = ({ feedback }) => {
  const { userPhoto, userName, comment, rating } = feedback;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="w-3 h-3" viewBox="0 0 20 20">
        <polygon
          points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
          className={i < rating ? "fill-amber-400" : "fill-gray-200"}
        />
      </svg>
    ));

  return (
    <div
      className="
        w-[280px] min-w-[280px] h-[260px]
        bg-white border border-emerald-100 rounded-2xl
        mx-3 p-5 flex flex-col justify-between
        hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50
        transition-all duration-200
      "
    >
      {/* Top: Avatar + Name + Stars */}
      <div className="flex items-center gap-3">
        <img
          referrerPolicy="no-referrer"
          src={userPhoto}
          alt={userName}
          className="w-12 h-12 min-w-[48px] rounded-full object-cover border-2 border-emerald-200"
        />
        <div>
          <p className="text-sm font-semibold text-emerald-900 leading-tight">{userName}</p>
          <div className="flex gap-0.5 mt-1">{renderStars(rating)}</div>
        </div>
      </div>

      {/* Quote icon */}
      <svg className="w-6 h-5 fill-emerald-100 my-1 flex-shrink-0" viewBox="0 0 40 28">
        <path d="M0 28V16C0 7.163 6.268 1.347 18.805 0l1.57 3.064C12.914 4.732 9.043 8.456 8.366 14H16V28H0zm24 0V16C24 7.163 30.268 1.347 42.805 0l1.57 3.064C36.914 4.732 33.043 8.456 32.366 14H40V28H24z" />
      </svg>

      {/* Comment — always 3 lines, no layout shift */}
      <p
        className={`text-gray-600 text-[13px] leading-relaxed flex-1 overflow-hidden ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {comment}
      </p>

      {/* Bottom: Rating badge + Read more */}
      <div className="flex items-center justify-between pt-3 border-t border-emerald-50 mt-1">
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          {rating}/5 Rating
        </span>
        <button
          onClick={toggleDescription}
          className="text-xs text-emerald-500 hover:text-emerald-700 font-medium transition-colors"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;