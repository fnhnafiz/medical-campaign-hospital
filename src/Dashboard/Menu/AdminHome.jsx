import { FaBell, FaClipboardList, FaUserMd, FaUsers } from "react-icons/fa";

const AdminHome = () => {
  const stats = [
    { id: 1, title: "Total Patients", value: 1245, icon: FaUsers },
    { id: 2, title: "Appointments Today", value: 27, icon: FaClipboardList },
    { id: 3, title: "Doctors Available", value: 15, icon: FaUserMd },
  ];

  const notifications = [
    "Patient John Smith canceled an appointment.",
    "Dr. Sarah Lee updated her availability.",
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. John",
      date: "2025-01-15",
      time: "10:00 AM",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Sarah",
      date: "2025-01-15",
      time: "12:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">MedCamp Admin Dashboard</h1>
        <div className="flex items-center">
          <FaUserMd className="text-3xl mr-2" />
          <span>Welcome, Admin</span>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-4 rounded-md shadow-md flex items-center"
          >
            <stat.icon className="text-blue-600 text-3xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Recent Appointments</h2>
          </div>
          {recentAppointments.length ? (
            <ul>
              {recentAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="mb-3 p-3 border-b border-gray-200"
                >
                  <p className="font-semibold">
                    {appointment.patient} with {appointment.doctor}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent appointments.</p>
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
      </div>
    </div>
  );
};

export default AdminHome;
