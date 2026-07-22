function LoadingScreen({ title = "Loading", subtitle = "Please wait while we prepare your experience." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900">
        <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
