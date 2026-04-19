import { FaSearch } from "react-icons/fa";
import { LayoutGrid, List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CampCard from "../Components/CampCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AvailableCampaigns = () => {
  const axiosPublic = useAxiosPublic();
  const [isThreeColumns, setIsThreeColumns] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [bounceSearchText, setDebounceSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 pt-[64px]">
      <div className="container mx-auto px-4 py-10">

        {/* Page Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-emerald-50 text-emerald-800 text-[11px] font-medium px-4 py-1 rounded-full mb-3">
            Medical campaigns
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            See the valuable campaigns for med camps
          </h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual.
          </p>
        </div>

        {/* Search & Controls Bar */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-8 shadow-sm">

          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            <input
              ref={searchInputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search campaigns by name..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-0 transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            defaultValue={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
          >
            <option value="name">Camp name</option>
            <option value="registered">Most registered</option>
            <option value="fees">Camp fees</option>
          </select>

          {/* Layout toggle */}
          <button
            onClick={() => setIsThreeColumns(!isThreeColumns)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
          >
            {isThreeColumns ? (
              <>
                <LayoutGrid className="w-4 h-4" />
                <span>3 columns</span>
              </>
            ) : (
              <>
                <List className="w-4 h-4" />
                <span>2 columns</span>
              </>
            )}
          </button>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-4 px-1">
          {camps.length} camp{camps.length !== 1 ? "s" : ""} found
        </p>

        {/* Camp Cards Grid */}
        {camps.length > 0 ? (
          <div
            className={`grid gap-5 ${
              isThreeColumns
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {camps.map((camp) => (
              <CampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FaSearch className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No campaigns found for "{searchText}"</p>
            <button
              onClick={() => setSearchText("")}
              className="mt-3 text-emerald-600 text-sm hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AvailableCampaigns;