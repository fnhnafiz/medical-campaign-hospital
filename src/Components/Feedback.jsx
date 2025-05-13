import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import FeedbackCard from "./FeedbackCard";
import SectionTitle from "./SectionTitle";
import Marquee from "react-fast-marquee";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbackData = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });
  console.log(feedbackData);
  return (
    <div className="pb-6">
      <SectionTitle
        heading="our patients feedback"
        subHeading="Rapidiously generate user friendly web-readiness with high standards in internal or 'organic' sources. Professionally maximize backward-compatible applications through interoperable e-tailers. Continually benchmark performance based infomediaries with interoperable interfaces. Dynamically revolutionize synergistic content whereas."
      ></SectionTitle>
      {/* <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
      </div> */}
      <Marquee autoFill={true} pauseOnHover gradient={false} speed={50}>
        {feedbackData.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </Marquee>
    </div>
  );
};

export default Feedback;
