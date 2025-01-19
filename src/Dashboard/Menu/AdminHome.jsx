import {
  FaCampground,
  FaMoneyBillWave,
  FaUserInjured,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <SectionTitle heading="Medical Campaign Dashboard"></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.users}</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white">
              <FaUsers size={24} />
            </div>
          </div>
        </div>

        {/* Campaigns Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Active Campaigns
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.joinCamp}
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white">
              <FaCampground size={24} />
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Patients
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.patients}
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white">
              <FaUserInjured size={24} />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.revinue}
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white">
              <FaMoneyBillWave size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
