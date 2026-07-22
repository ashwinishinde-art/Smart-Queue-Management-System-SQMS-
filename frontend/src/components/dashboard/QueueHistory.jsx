import { useEffect, useState } from "react";
import { FaHistory, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

import { getQueueHistory } from "../../services/queueService";

function QueueHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getQueueHistory();
      setHistory(data.history || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchHistory();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <main className="p-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaHistory className="text-blue-600" />
            Queue History
          </h1>

          <p className="text-gray-600 mt-2 mb-8">
            View all completed and cancelled queues.
          </p>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              Loading...
            </div>
          ) : history.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              No queue history found.
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((item) => (
                <div
                  key={`${item.queueId}-${item.tokenNumber}`}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-600">
                        {item.queueName}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Token #{item.tokenNumber}
                      </p>
                    </div>

                    {item.status === "completed" ? (
                      <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                        <FaCheckCircle />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
                        <FaTimesCircle />
                        Cancelled
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-500 text-sm">
                        Joined At
                      </p>

                      <p className="font-semibold mt-1">
                        {formatDate(item.joinedAt)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-500 text-sm">
                        Finished At
                      </p>

                      <p className="font-semibold mt-1">
                        {formatDate(item.completedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default QueueHistory;