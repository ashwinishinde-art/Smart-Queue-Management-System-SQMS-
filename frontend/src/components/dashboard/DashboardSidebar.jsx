import { FaClipboardList, FaHistory, FaHome, FaRocket, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Join Queue", icon: <FaClipboardList />, path: "/dashboard" },
    { name: "Queue History", icon: <FaHistory />, path: "/history" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200/80 bg-white/90 px-5 py-6 text-slate-800 shadow-[12px_0_35px_rgba(15,23,42,0.04)] backdrop-blur-xl lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-950/95 dark:text-white">
      <div className="rounded-[24px] border border-slate-200/70 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-5 text-white shadow-lg dark:border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg">
            <FaRocket />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-100">Workspace</p>
            <h2 className="mt-1 text-2xl font-semibold">SQMS</h2>
          </div>
        </div>
        <p className="mt-3 text-sm text-indigo-50/90">Smarter queues, calmer service.</p>
      </div>

      <nav className="mt-8 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/dashboard");

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
        <p className="font-semibold">Queue health looks strong</p>
        <p className="mt-1 text-emerald-600/90 dark:text-emerald-100/80">Stay proactive with live updates and smarter service planning.</p>
      </div>
    </aside>
  );
}

export default DashboardSidebar;