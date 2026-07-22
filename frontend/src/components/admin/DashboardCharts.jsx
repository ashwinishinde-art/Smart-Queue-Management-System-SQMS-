import { Bar, Doughnut } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function DashboardCharts({ queues, stats }) {
  const departmentCounts = queues.reduce((acc, queue) => {
    const key = queue.department || "General";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = queues.reduce((acc, queue) => {
    const key = queue.status || "open";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: "Queues by Department",
        data: Object.values(departmentCounts),
        backgroundColor: ["#3b82f6", "#14b8a6", "#8b5cf6", "#f97316", "#ef4444"],
        borderRadius: 10,
      },
    ],
  };

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Queue Status Distribution",
        data: Object.values(statusCounts),
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444", "#3b82f6"],
      },
    ],
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Queue Overview</h3>
        <div className="mt-4 h-72">
          <Bar
            data={departmentData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live Queue Health</h3>
        <div className="mt-4 h-72">
          <Doughnut
            data={statusData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900 xl:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Admin Snapshot</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-blue-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-blue-600">Total Queues</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.totalQueues}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-emerald-600">Waiting</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.waitingStudents}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-amber-600">Serving</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.servingStudents}</p>
          </div>
          <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-violet-600">Completed</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.completedStudents}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
