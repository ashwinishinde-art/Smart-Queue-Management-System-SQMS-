import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaShieldAlt, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful");

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/80 via-indigo-950/70 to-cyan-900/80 backdrop-blur-[2px]" />

      <Link to="/" className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
        <FaArrowLeft />
        Back to Home
      </Link>

      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-10 text-white xl:flex xl:flex-col xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm backdrop-blur">
              <FaShieldAlt />
              Secure access for every queue
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight">Welcome back to a smoother experience.</h1>
            <p className="mt-4 max-w-md text-lg text-indigo-50/90">Stay in control of your bookings with crisp, reliable updates and a premium interface.</p>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">Why teams love SQMS</p>
            <ul className="mt-4 space-y-3 text-sm text-indigo-50">
              <li>• Faster check-ins with less waiting</li>
              <li>• Live progress and notifications</li>
              <li>• Designed to feel calm and professional</li>
            </ul>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-500 to-cyan-500 text-white shadow-lg">
                <FaUserShield size={24} />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Sign In</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Continue to your queue workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white/90 px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800/80">
                  <FaEnvelope className="text-slate-400" />
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full bg-transparent p-3 outline-none dark:text-slate-100" autoComplete="email" aria-label="Email" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white/90 px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800/80">
                  <FaLock className="text-slate-400" />
                  <input id="password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full bg-transparent p-3 outline-none dark:text-slate-100" autoComplete="current-password" aria-label="Password" />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="ml-2 text-slate-500 transition hover:text-indigo-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
              </div>

              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:from-indigo-400">
                {loading ? "Signing in..." : "Sign In"}
                <FaArrowRight />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Need an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Create one</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
