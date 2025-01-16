import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRegister = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: registerCampaign = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registerCampaign"],
    queryFn: async () => {
      const res = await axiosSecure.get("/register-campaign");
      return res.data;
    },
  });
  return [registerCampaign, isLoading, refetch];
};

export default useRegister;
