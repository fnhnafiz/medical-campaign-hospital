import { FaSearch } from "react-icons/fa";
import CampCard from "../Components/CampCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AvailableCampaigns = () => {
  const axiosPublic = useAxiosPublic();
  const [isThreeColumns, setIsThreeColumns] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [bounceSearchText, setDebounceSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  // console.log(searchText);
  // console.log(sortBy);
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      setDebounceSearchText(searchText);
    }, 300);
    return () => clearTimeout(timeHandler);
  }, [searchText]);

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps", bounceSearchText, sortBy],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/available-camps?search=${bounceSearchText}&sort=${sortBy}`
      );
      return res.data;
    },
  });
  // console.log(camps);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto px-4">
      <div className="px-6">
        {/* Header Section */}
        <h1 className="text-5xl font-bold text-center pt-20 mb-12">
          Available Campaigns
        </h1>

        {/* Search and Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              ref={searchInputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search with campaigns name..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            {/* <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" /> */}
          </div>

          {/* Sort Dropdown */}
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Camp Name</option>
            <option value="registered">Most Registered</option>
            <option value="fees">Camp Fees</option>
          </select>

          {/* Layout Toggle */}
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setIsThreeColumns(!isThreeColumns)}
          >
            {isThreeColumns ? (
              <>
                <LayoutGrid className="w-5 h-5" />
                <span>3 Columns</span>
              </>
            ) : (
              <>
                <List className="w-5 h-5" />
                <span>2 Columns</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className={`grid gap-6 px-6  my-12 ${
          isThreeColumns
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {camps?.map((camp) => (
          <CampCard key={camp._id} camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCampaigns;
