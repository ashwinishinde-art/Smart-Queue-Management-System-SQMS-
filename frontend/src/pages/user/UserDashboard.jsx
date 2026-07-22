import { useEffect, useState } from "react";
import { FaBell, FaClock, FaMagic, FaSearch, FaStar, FaTasks, FaUserCircle } from "react-icons/fa";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import StatsCards from "../../components/dashboard/StatsCards";
import JoinQueue from "../../components/dashboard/JoinQueue";
import MyActiveQueues from "../../components/dashboard/MyActiveQueues";

import { getMyActiveQueues, getUserQueueStats } from "../../services/queueService";

function UserDashboard() {
  const [activeQueues, setActiveQueues] = useState([]);
  const [stats, setStats] = useState({ completedVisits: 0, totalVisits: 0 });
  const [loading, setLoading] = useState(true);

  const fetchActiveQueues = async () => {
    try {
      const data = await getMyActiveQueues();
      setActiveQueues(data.queues || []);
    } catch {
      setActiveQueues([]);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getUserQueueStats();
      setStats(data.stats || { completedVisits: 0, totalVisits: 0 });
    } catch {
      setStats({ completedVisits: 0, totalVisits: 0 });
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = async () => {
    await Promise.all([fetchActiveQueues(), fetchStats()]);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshDashboard();
    }, 0);

    const handleQueueRefresh = () => {
      void refreshDashboard();
    };

    window.addEventListener("queue-state-refresh", handleQueueRefresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("queue-state-refresh", handleQueueRefresh);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)]">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <DashboardNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <FaMagic />
                  Welcome back
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Your queue experience, beautifully organized.</h2>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">Keep track of your active entries, monitor the latest updates, and move through service flows with clarity.</p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <FaSearch className="text-slate-400" />
                <input className="w-40 bg-transparent text-sm outline-none dark:text-slate-100" placeholder="Search" />
              </div>
            </div>
          </div>

          <StatsCards activeQueues={activeQueues.length} completedVisits={stats.completedVisits} totalVisits={stats.totalVisits} />

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Quick Actions</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Start from anywhere</h3>
                  </div>
                  <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                    <FaTasks />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Join a Queue</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Secure your place and stay informed.</p>
                  </button>
                  <button className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Review Activity</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">See recent updates and history.</p>
                  </button>
                </div>
              </div>

              <JoinQueue onQueueJoined={refreshDashboard} />
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Recent Activity</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Stay ahead of the queue</h3>
                  </div>
                  <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">
                    <FaBell />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-slate-100">Queue status updated</p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Just now</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">You remain in a healthy position with live tracking enabled.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-slate-100">Notifications are active</p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">2 min ago</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">You will be notified as soon as your turn approaches.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <FaUserCircle size={28} />
                  <div>
                    <p className="font-semibold">Profile Snapshot</p>
                    <p className="text-sm text-indigo-100">Your workspace is ready and synced.</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <FaClock />
                  <span className="text-sm">Live queue updates are enabled.</span>
                </div>
              </div>

              <MyActiveQueues activeQueues={activeQueues} loading={loading} refreshQueues={refreshDashboard} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;