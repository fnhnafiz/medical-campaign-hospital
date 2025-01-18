import Banner from "../Components/Banner";
import Feedback from "../Components/Feedback";
import TopParticipantCampaign from "../Components/TopParticipantCampaign";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <TopParticipantCampaign></TopParticipantCampaign>

      <Feedback></Feedback>
    </div>
  );
};

export default Home;
