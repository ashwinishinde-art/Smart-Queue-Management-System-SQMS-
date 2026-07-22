import { Link } from "react-router-dom";
import { FaLock, FaHome } from "react-icons/fa";

function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl dark:bg-slate-900">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
          <FaLock size={32} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">403 Error</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Unauthorized</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <FaHome />
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
