import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import CampCard from "./CampCard";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const TopParticipantCampaign = () => {
  const axiosPublic = useAxiosPublic();
  // const [campaing] = useCampaings();
  const { data: campaign = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-camps");
      return res.data;
    },
  });
  const sortedCampaigns = [...campaign].sort(
    (a, b) => b.participantCount - a.participantCount
  );
  const topParticipantCampaigns = sortedCampaigns.slice(0, 6);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <SectionTitle
        heading="top of participant contributer"
        subHeading="Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual."
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-6 md:px-12 my-12">
        {topParticipantCampaigns?.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
      <Link to="/available-camps">
        <button className="uppercase px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-300 transition-all duration-200 block mx-auto my-8">
          See more Campaigns
        </button>
      </Link>
    </div>
  );
};

export default TopParticipantCampaign;
