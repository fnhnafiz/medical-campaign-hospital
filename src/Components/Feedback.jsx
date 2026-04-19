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

  return (
    <div className="pb-6">
      <SectionTitle
        heading="our patients feedback"
        subHeading="Rapidiously generate user friendly web-readiness with high standards..."
      />
      <div className="bg-emerald-50/50 py-4 rounded-2xl">
        <Marquee autoFill={true} pauseOnHover gradient={false} speed={50}>
          {feedbackData.map((feedback, index) => (
            <FeedbackCard key={index} feedback={feedback} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Feedback;