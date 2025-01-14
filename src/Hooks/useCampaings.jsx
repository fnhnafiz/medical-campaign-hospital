import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCampaings = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: campaign = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-camps");
      return res.data;
    },
  });
  //   console.log("Am I campaing from hook", campaign);
  return [campaign, isLoading, refetch];
};

export default useCampaings;
