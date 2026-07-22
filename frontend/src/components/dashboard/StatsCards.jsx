import { FaCheckCircle, FaClipboardList, FaUsers } from "react-icons/fa";

function StatsCards({ activeQueues, completedVisits, totalVisits }) {
  const stats = [
    { title: "Active Queues", value: activeQueues, icon: <FaUsers className="text-3xl text-indigo-600" />, accent: "from-indigo-500/10 to-indigo-600/5" },
    { title: "Completed", value: completedVisits, icon: <FaCheckCircle className="text-3xl text-emerald-600" />, accent: "from-emerald-500/10 to-emerald-600/5" },
    { title: "Total Visits", value: totalVisits, icon: <FaClipboardList className="text-3xl text-violet-600" />, accent: "from-violet-500/10 to-violet-600/5" },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <div key={item.title} className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${item.accent} p-6 shadow-sm`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</h2>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;