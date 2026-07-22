import { useEffect, useState } from "react";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import { getNotifications, markNotificationsAsRead } from "../../services/queueService";

function DashboardNavbar() {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRoleLabel = user?.role === "student" ? "User" : user?.role;
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleBellClick = async () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);

    if (nextState) {
      await markNotificationsAsRead();
      await loadNotifications();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600 dark:text-indigo-400">Control Center</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">SQMS Dashboard</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />

          <div className="relative">
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              onClick={handleBellClick}
            >
              <FaBell />
              {notifications.some((item) => !item.isRead) && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                  {notifications.filter((item) => !item.isRead).length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 z-50 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-3 py-2 font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Notifications</div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-slate-500 dark:text-slate-400">No notifications yet.</p>
                  ) : (
                    notifications.map((item) => (
                      <div key={item._id} className={`border-b border-slate-100 px-3 py-3 last:border-b-0 dark:border-slate-800 ${item.isRead ? "bg-white dark:bg-slate-900" : "bg-indigo-50 dark:bg-indigo-500/10"}`}>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{item.message}</p>
                        <p className="mt-1 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div onClick={() => navigate("/profile")} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800">
            <FaUserCircle className="text-3xl text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user ? user.fullName : "Loading..."}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{userRoleLabel || ""}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
