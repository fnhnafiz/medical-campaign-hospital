import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import CampCard from "./CampCard";
import LoadingSpinner from "./LoadingSpinner";

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
      <h1 className="font-bold text-4xl text-center py-5 uppercase">
        top participant people here
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-6 md:px-12 my-12">
        {topParticipantCampaigns?.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default TopParticipantCampaign;
