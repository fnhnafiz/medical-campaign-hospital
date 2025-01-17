import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useCampaings = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    data: campaign = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns"],
    enabled: !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard-camps");
      return res.data;
    },
  });
  //   console.log("Am I campaing from hook", campaign);
  return [campaign, isLoading, refetch];
};

export default useCampaings;
