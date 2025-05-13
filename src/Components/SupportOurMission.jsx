import toast from "react-hot-toast";
import { FaHandHoldingHeart, FaPeopleCarry, FaShareAlt } from "react-icons/fa";

const SupportOurMission = () => {
  const handleDonate = () => {
    toast.success("Thanks for donate");
  };
  const handleVlountes = () => {
    toast.success("Welcome to Medcampaign");
  };
  const handleShare = () => {
    toast.success("Thanks for Sharing");
  };

  return (
    <section className="  py-16 px-6 bg-gradient-to-r from-emerald-500 to-teal-500">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold">Support Our Mission</h2>
        <p className="text-lg mt-4">
          Together, we can make a difference in healthcare accessibility and
          awareness.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Donate Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <FaHandHoldingHeart className="text-emerald-500 text-5xl mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">Donate</h3>
          <p className="text-gray-600 mt-4">
            Your contribution helps us reach more people and host impactful
            medical camps.
          </p>
          <button
            onClick={handleDonate}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-md hover:opacity-90"
          >
            Donate Now
          </button>
        </div>

        {/* Volunteer Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <FaPeopleCarry className="text-emerald-500 text-5xl mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">
            Volunteer
          </h3>
          <p className="text-gray-600 mt-4">
            Join our team of dedicated volunteers and make a hands-on
            difference.
          </p>
          <button
            onClick={handleVlountes}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-md hover:opacity-90"
          >
            Join as Volunteer
          </button>
        </div>

        {/* Spread the Word Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
          <FaShareAlt className="text-emerald-500 text-5xl mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">
            Spread the Word
          </h3>
          <p className="text-gray-600 mt-4">
            Share our mission with your friends and family to amplify our
            impact.
          </p>
          <button
            onClick={handleShare}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-md hover:opacity-90"
          >
            Share Our Mission
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportOurMission;
