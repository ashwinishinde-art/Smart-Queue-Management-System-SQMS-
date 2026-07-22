import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaBuilding, FaClock, FaTicketAlt, FaUsers } from "react-icons/fa";

import { getAllQueues } from "../../services/adminService";

function QueueDetails() {
  const { queueId } = useParams();
  const [queue, setQueue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const data = await getAllQueues();
        const foundQueue = (data.queues || []).find((item) => item._id === queueId);
        setQueue(foundQueue || null);
      } catch {
        setQueue(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchQueue();
  }, [queueId]);

  const queueStatusText = useMemo(() => {
    if (!queue) return "Unknown";

    const map = {
      open: "Open",
      paused: "Paused",
      closed: "Closed",
    };

    return map[queue.status] || queue.status;
  }, [queue]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl px-8 py-10 text-center">
          <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-slate-600 dark:text-slate-300">Loading queue details...</p>
        </div>
      </div>
    );
  }

  if (!queue) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl bg-white dark:bg-slate-900 p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Queue Not Found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">The queue details you requested are unavailable.</p>
          <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-xl md:p-8"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Queue Details</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{queue.queueName}</h1>
            </div>

            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              <FaArrowLeft /> Back
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 dark:bg-slate-800 p-5">
              <div className="flex items-center gap-3 text-blue-600">
                <FaBuilding />
                <span className="text-sm font-semibold">Department</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{queue.department}</p>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-slate-800 p-5">
              <div className="flex items-center gap-3 text-emerald-600">
                <FaTicketAlt />
                <span className="text-sm font-semibold">Current Token</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">#{queue.currentToken ?? 0}</p>
            </div>

            <div className="rounded-2xl bg-amber-50 dark:bg-slate-800 p-5">
              <div className="flex items-center gap-3 text-amber-600">
                <FaClock />
                <span className="text-sm font-semibold">Service Time</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{queue.averageServiceTime || 5} mins</p>
            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-slate-800 p-5">
              <div className="flex items-center gap-3 text-violet-600">
                <FaUsers />
                <span className="text-sm font-semibold">Status</span>
              </div>
              <p className="mt-3 text-2xl font-bold capitalize text-slate-900 dark:text-white">{queueStatusText}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Summary</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This queue belongs to the <span className="font-semibold text-slate-800 dark:text-slate-100">{queue.department}</span> department and is currently marked as <span className="font-semibold capitalize text-slate-800 dark:text-slate-100">{queueStatusText}</span>. It is designed to help students join, wait, and monitor service progression in a structured and professional queue workflow.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QueueDetails;
