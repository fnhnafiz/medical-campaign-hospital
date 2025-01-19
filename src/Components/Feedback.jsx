import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import FeedbackCard from "./FeedbackCard";
import SectionTitle from "./SectionTitle";

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
    <div className="py-12">
      <SectionTitle
        heading="our patients feedback"
        subHeading="Rapidiously generate user friendly web-readiness with high standards in internal or 'organic' sources. Professionally maximize backward-compatible applications through interoperable e-tailers. Continually benchmark performance based infomediaries with interoperable interfaces. Dynamically revolutionize synergistic content whereas."
      ></SectionTitle>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedbackData?.map((feedback) => (
          <FeedbackCard key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
