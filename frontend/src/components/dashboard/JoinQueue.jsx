import { useEffect, useState } from "react";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAllQueues, joinQueue } from "../../services/queueService";

function JoinQueue({ onQueueJoined }) {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [joining, setJoining] = useState(false);

  const fetchQueues = async () => {
    try {
      const data = await getAllQueues();
      setQueues((data.queues || []).filter((queue) => queue.status === "open"));
    } catch {
      toast.error("Failed to load queues.");
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchQueues();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleJoinQueue = async () => {
    if (!selectedQueue) {
      toast.warning("Please select a queue.");
      return;
    }

    try {
      setJoining(true);
      const response = await joinQueue(selectedQueue);
      toast.success("Successfully joined the queue!");
      setSelectedQueue("");

      if (onQueueJoined) {
        await onQueueJoined();
      }

      window.dispatchEvent(new Event("queue-state-refresh"));
      window.dispatchEvent(new Event("queue-history-refresh"));
      console.log("Join Response:", response);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join queue.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
          <FaClock />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Join New Queue</h2>
          <p className="text-sm text-slate-500">Select an open queue and secure your place.</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Select Queue</label>
          <select value={selectedQueue} onChange={(e) => setSelectedQueue(e.target.value)} disabled={joining} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
            <option value="">Select a Queue</option>
            {queues.map((queue) => (
              <option key={queue._id} value={queue._id}>
                {queue.queueName}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleJoinQueue} disabled={joining} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:from-indigo-400">
          {joining ? "Joining..." : "Join Queue"}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default JoinQueue;