import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ParticipantAnalytics = ({ joinCampAnalytics }) => {
  const totalSpent = joinCampAnalytics.reduce(
    (sum, camp) => sum + camp.campFees,
    0
  );
  const campFeesData = joinCampAnalytics.map((camp) => ({
    name: camp.campName,
    fees: camp.campFees,
  }));
  const locationData = joinCampAnalytics.reduce((acc, camp) => {
    acc[camp.location] = (acc[camp.location] || 0) + 1;
    return acc;
  }, {});
  const locationChartData = Object.entries(locationData).map(
    ([location, count]) => ({
      name: location,
      value: count,
    })
  );
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Camps Joined
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {joinCampAnalytics?.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Amount Spent
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalSpent}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Confirmed Camps
          </h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {
              joinCampAnalytics?.filter(
                (camp) => camp.confirmationStatus === "confirmed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Camp Fees Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Camp Fees Comparison
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campFeesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Bar
                dataKey="fees"
                fill="#8884d8"
                name="Camp Fees ($)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Camp Locations Distribution
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={locationChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {locationChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ParticipantAnalytics;
