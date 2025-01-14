import useCampaings from "../Hooks/useCampaings";
import CampCard from "./CampCard";

const TopParticipantCampaign = () => {
  const [campaing] = useCampaings();
  const sortedCampaigns = [...campaing].sort(
    (a, b) => b.participantCount - a.participantCount
  );
  const topParticipantCampaigns = sortedCampaigns.slice(0, 6);
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
