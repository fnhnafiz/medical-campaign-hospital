import CampCard from "../Components/CampCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AvailableCampaigns = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-camps");
      return res.data;
    },
  });
  // console.log(camps);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="text-5xl font-bol text-center pt-20">
        Available Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-6 md:px-12 my-12">
        {camps?.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCampaigns;
