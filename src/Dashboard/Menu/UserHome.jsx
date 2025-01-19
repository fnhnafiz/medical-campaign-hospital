import {
  FaBell,
  FaCalendarAlt,
  FaHeartbeat,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const appointments = [
    { id: 1, date: "2025-01-20", time: "10:00 AM", doctor: "Dr. John Doe" },
    { id: 2, date: "2025-01-22", time: "2:00 PM", doctor: "Dr. Sarah Lee" },
  ];

  const notifications = [
    "Your lab results are ready to view.",
    "Don't forget to take your vitamin D supplement.",
  ];

  const healthTips = [
    "Stay hydrated by drinking at least 8 glasses of water daily.",
    "Engage in 30 minutes of moderate exercise each day.",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">MedCamp Dashboard</h1>
        <div className="flex items-center">
          <FaUserCircle className="text-3xl mr-2" />
          <span>Welcome, {user?.displayName}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          </div>
          {appointments.length ? (
            <ul>
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="mb-3 p-3 border-b border-gray-200"
                >
                  <p className="font-semibold">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: {appointment.doctor}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <FaBell className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          {notifications.length ? (
            <ul>
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="mb-2 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-md"
                >
                  {notification}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new notifications.</p>
          )}
        </div>

        {/* Health Tips */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <FaHeartbeat className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Health Tips</h2>
          </div>
          <ul>
            {healthTips.map((tip, index) => (
              <li
                key={index}
                className="mb-2 p-3 bg-green-50 border-l-4 border-green-600 rounded-md"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
