import Banner from "../Components/Banner";
import Feedback from "../Components/Feedback";
import HealthBlog from "../Components/HealthBlog";
import OurSpecialist from "../Components/OurSpecialist";

import TopParticipantCampaign from "../Components/TopParticipantCampaign";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <TopParticipantCampaign></TopParticipantCampaign>

      <OurSpecialist />
      <HealthBlog />
      <Feedback></Feedback>
      
    </div>
  );
};

export default Home;
