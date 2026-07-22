import { FaBuilding, FaClock, FaSignOutAlt, FaTicketAlt, FaUsers, FaWalking } from "react-icons/fa";
import { toast } from "react-toastify";
import { leaveQueue } from "../../services/queueService";

function MyActiveQueues({ activeQueues, loading, refreshQueues }) {
  const handleLeaveQueue = async (queueId) => {
    try {
      const response = await leaveQueue(queueId);
      toast.success(response.message);
      await refreshQueues();
      window.dispatchEvent(new Event("queue-state-refresh"));
      window.dispatchEvent(new Event("queue-history-refresh"));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave queue.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur">
        <h2 className="text-2xl font-semibold text-slate-900">My Active Queues</h2>
        <div className="mt-8 flex h-40 items-center justify-center rounded-[24px] bg-slate-50 text-slate-500">Loading queues...</div>
      </div>
    );
  }

  if (activeQueues.length === 0) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur">
        <h2 className="text-2xl font-semibold text-slate-900">My Active Queues</h2>
        <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 py-14 text-center">
          <FaBuilding className="mb-4 text-slate-300" size={60} />
          <h3 className="text-xl font-semibold text-slate-700">No active queues yet</h3>
          <p className="mt-2 text-slate-500">Join a queue to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">My Active Queues</h2>

      <div className="mt-6 space-y-6">
        {activeQueues.map((queue) => (
          <div key={queue.queueId} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <FaBuilding />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{queue.queueName}</h3>
                  <p className="text-sm text-slate-500">Live position details</p>
                </div>
              </div>

              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${queue.status === "waiting" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                {queue.status === "waiting" ? "Waiting" : "Serving"}
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600"><FaTicketAlt /><span className="text-sm">Token</span></div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">#{queue.tokenNumber}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600"><FaUsers /><span className="text-sm">Position</span></div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{queue.position}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-orange-600"><FaWalking /><span className="text-sm">Ahead</span></div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{queue.peopleAhead}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-violet-600"><FaClock /><span className="text-sm">ETA</span></div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{queue.estimatedWaitingTime}m</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-[20px] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-slate-600">Now serving</span>
              <span className="text-2xl font-semibold text-indigo-600">#{queue.currentToken}</span>
            </div>

            <button onClick={() => handleLeaveQueue(queue.queueId)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white">
              <FaSignOutAlt />
              Leave Queue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyActiveQueues;