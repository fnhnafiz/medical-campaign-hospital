import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: organizer = {}, isPending: isAdminLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/admin/${user?.email}`);
      return data?.admin;
    },
  });
  // console.log("I am from useAdmin", organizer);
  return [organizer, isAdminLoading];
};

export default useAdmin;
