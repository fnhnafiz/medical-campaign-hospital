import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import FeedbackCard from "./FeedbackCard";

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
      <h1 className="text-5xl text-center font-bold">Feedback From Users</h1>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedbackData?.map((feedback) => (
          <FeedbackCard key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
