function ActivityLog({ logs }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Admin Activity Log</h3>

      <div className="mt-4 space-y-3">
        {logs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No admin actions recorded yet.
          </div>
        ) : (
          logs.map((entry, index) => (
            <div key={`${entry.action}-${index}`} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900 dark:text-white">{entry.action}</p>
                <span className="text-xs text-slate-500 dark:text-slate-300">{entry.time}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{entry.detail}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivityLog;
