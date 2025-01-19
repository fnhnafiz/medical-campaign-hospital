import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ParticipantAnalytics from "./ParticipantAnalytics";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: joinCampAnalytics = [] } = useQuery({
    queryKey: ["analytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-campaign/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <ParticipantAnalytics
        joinCampAnalytics={joinCampAnalytics}
      ></ParticipantAnalytics>
    </div>
  );
};

export default Analytics;
