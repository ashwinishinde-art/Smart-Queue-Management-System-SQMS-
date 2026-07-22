import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl dark:bg-slate-900">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
          <FaSearch size={32} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">404 Error</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;