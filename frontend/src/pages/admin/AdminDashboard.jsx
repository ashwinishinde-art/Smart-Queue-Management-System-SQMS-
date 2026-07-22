import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaBan, FaBolt, FaChartBar, FaCheckCircle, FaClock, FaDownload, FaFilter, FaLayerGroup, FaPauseCircle, FaSearch, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

import LoadingScreen from "../../components/common/LoadingScreen";
import DashboardCharts from "../../components/admin/DashboardCharts";
import ActivityLog from "../../components/admin/ActivityLog";

import {
  getDashboardStats,
  getAllQueues,
  createQueue,
  callNextStudent,
  completeStudent,
  pauseQueue,
  resumeQueue,
  closeQueue,
} from "../../services/adminService";

const initialStats = {
  totalQueues: 0,
  activeQueues: 0,
  waitingStudents: 0,
  servingStudents: 0,
  completedStudents: 0,
  cancelledStudents: 0,
};

const initialFormData = {
  queueName: "",
  department: "",
  averageServiceTime: 5,
};

function AdminDashboard() {
  const [stats, setStats] = useState(initialStats);
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queuesLoading, setQueuesLoading] = useState(true);
  const [busyQueueId, setBusyQueueId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activityLogs, setActivityLogs] = useState([
    {
      action: "Dashboard Loaded",
      detail: "Admin dashboard synced successfully.",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const addActivityLog = useCallback((action, detail) => {
    setActivityLogs((prev) => [
      {
        action,
        detail,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 8));
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.dashboard || initialStats);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadQueues = useCallback(async () => {
    try {
      const data = await getAllQueues();
      setQueues(data.queues || []);
    } catch {
      toast.error("Failed to load queues");
    } finally {
      setQueuesLoading(false);
    }
  }, []);

  const refreshAdminData = useCallback(async () => {
    await Promise.all([loadDashboard(), loadQueues()]);
  }, [loadDashboard, loadQueues]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshAdminData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refreshAdminData]);

  const filteredQueues = useMemo(() => {
    return queues.filter((queue) => {
      const matchesSearch = [queue.queueName, queue.department]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === "all" || queue.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" || queue.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [queues, searchTerm, departmentFilter, statusFilter]);

  const departmentOptions = useMemo(() => {
    return [...new Set(queues.map((queue) => queue.department).filter(Boolean))];
  }, [queues]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateQueue = async (e) => {
    e.preventDefault();

    try {
      await createQueue(formData);

      toast.success("Queue created successfully");
      addActivityLog("Queue Created", `Created ${formData.queueName} for ${formData.department}.`);

      setFormData(initialFormData);
      await refreshAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create queue");
    }
  };

  const handleQueueAction = async (action, queueId) => {
    setBusyQueueId(queueId);

    try {
      let response;

      if (action === "call-next") {
        response = await callNextStudent(queueId);
      } else if (action === "complete") {
        response = await completeStudent(queueId);
      } else if (action === "pause") {
        response = await pauseQueue(queueId);
      } else if (action === "resume") {
        response = await resumeQueue(queueId);
      } else if (action === "close") {
        response = await closeQueue(queueId);
      }

      toast.success(response?.message || "Action completed successfully");
      addActivityLog(action.toUpperCase(), response?.message || "Queue action completed successfully.");
      await refreshAdminData();
      window.dispatchEvent(new Event("queue-state-refresh"));
      window.dispatchEvent(new Event("queue-history-refresh"));
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setBusyQueueId(null);
    }
  };

  const handleExportCsv = () => {
    if (filteredQueues.length === 0) {
      toast.warning("No queues match the current filters.");
      return;
    }

    const header = ["Queue Name", "Department", "Status", "Current Token", "Average Service Time"];
    const rows = filteredQueues.map((queue) => [
      queue.queueName,
      queue.department,
      queue.status,
      queue.currentToken ?? 0,
      queue.averageServiceTime ?? 5,
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sqms-queue-report.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Queue report exported.");
    addActivityLog("CSV Export", "Generated a queue report export.");
  };

  const getStatusBadgeClass = (status) => {
    if (status === "paused") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
    }

    if (status === "closed") {
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
    }

    return "bg-green-100 text-green-700 dark:bg-emerald-900 dark:text-emerald-200";
  };

  if (loading) {
    return <LoadingScreen title="Admin Dashboard" subtitle="Preparing queue analytics and controls..." />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] p-4 md:p-8 dark:bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_28%),linear-gradient(135deg,#020617_0%,#111827_100%)]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900/80">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Admin Control Center</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Smart Queue Operations</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage queues with clarity, speed, and a polished control surface.</p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl dark:shadow-indigo-950"
          >
            <FaDownload /> Export CSV
          </button>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {[
            { label: "Total Queues", value: stats.totalQueues, icon: <FaLayerGroup />, tone: "from-indigo-500 to-violet-500" },
            { label: "Active Queues", value: stats.activeQueues, icon: <FaBolt />, tone: "from-cyan-500 to-sky-500" },
            { label: "Waiting", value: stats.waitingStudents, icon: <FaUsers />, tone: "from-amber-500 to-orange-500" },
            { label: "Serving", value: stats.servingStudents, icon: <FaClock />, tone: "from-emerald-500 to-green-500" },
            { label: "Completed", value: stats.completedStudents, icon: <FaCheckCircle />, tone: "from-violet-500 to-indigo-500" },
            { label: "Cancelled", value: stats.cancelledStudents, icon: <FaBan />, tone: "from-rose-500 to-red-500" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-br ${item.tone} p-3 text-white`}>{item.icon}</div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <FaBolt />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Create Queue</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Add a new queue with a clear service flow and department context.</p>

            <form onSubmit={handleCreateQueue} className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="queueName"
                placeholder="Queue Name"
                value={formData.queueName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <input
                type="number"
                name="averageServiceTime"
                value={formData.averageServiceTime}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl dark:shadow-indigo-950"
              >
                Create Queue
              </button>
            </form>
          </div>

          <ActivityLog logs={activityLogs} />
        </div>

        <div className="mt-8">
          <DashboardCharts queues={queues} stats={stats} />
        </div>

        <div className="mt-8 rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <FaChartBar />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Queue Directory</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search queue"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="relative">
                <FaFilter className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="all">All Departments</option>
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {queuesLoading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Loading queues...
            </div>
          ) : filteredQueues.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">No queues match your selection</h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400">Try a different search term or reset the filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Queue Name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Department</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Current Token</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Avg. Service</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredQueues.map((queue) => (
                    <tr key={queue._id} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{queue.queueName}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{queue.department}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusBadgeClass(queue.status)}`}>{queue.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">#{queue.currentToken ?? 0}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{queue.averageServiceTime} min</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleQueueAction("call-next", queue._id)} disabled={busyQueueId === queue._id} className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{busyQueueId === queue._id ? "Working..." : "Call Next"}</button>
                          <button onClick={() => handleQueueAction("complete", queue._id)} disabled={busyQueueId === queue._id} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">Complete</button>
                          <button onClick={() => handleQueueAction("pause", queue._id)} disabled={busyQueueId === queue._id || queue.status === "paused" || queue.status === "closed"} className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60">Pause</button>
                          <button onClick={() => handleQueueAction("resume", queue._id)} disabled={busyQueueId === queue._id || queue.status === "open" || queue.status === "closed"} className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">Resume</button>
                          <button onClick={() => handleQueueAction("close", queue._id)} disabled={busyQueueId === queue._id || queue.status === "closed"} className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60">Close</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;