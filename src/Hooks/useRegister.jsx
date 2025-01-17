import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRegister = (searchText = "") => {
  const axiosSecure = useAxiosSecure();
  const {
    data: registerCampaign = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registerCampaign", searchText],
    enabled: !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/register-campaign?search=${searchText}`
      );
      return res.data;
    },
  });
  return [registerCampaign, isLoading, refetch];
};

export default useRegister;
