import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaClipboardCheck, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (formData.fullName.trim().length < 2) return "Full name must be at least 2 characters";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) return "Please enter a valid email address";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/80 via-indigo-950/70 to-cyan-900/70 backdrop-blur-[2px]" />

      <Link to="/" className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
        <FaArrowLeft />
        Back to Home
      </Link>

      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-600 p-10 text-white xl:flex xl:flex-col xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur">
              <FaClipboardCheck />
              Create your queue profile
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight">Get started in minutes and join the queue with confidence.</h1>
            <p className="mt-4 max-w-md text-lg text-slate-200">A premium onboarding experience that feels fast, polished, and trustworthy.</p>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>• Live queue updates</li>
              <li>• Smart reminders</li>
              <li>• A beautiful dashboard experience</li>
            </ul>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Create Account</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Join your team’s queue experience in seconds.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white/90 px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800/80">
                  <FaUserAlt className="text-slate-400" />
                  <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full bg-transparent p-3 outline-none dark:text-slate-100" autoComplete="name" aria-label="Full Name" />
                </div>
              </div>

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
                  <input id="password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full bg-transparent p-3 outline-none dark:text-slate-100" autoComplete="new-password" aria-label="Password" />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="ml-2 text-slate-500 transition hover:text-indigo-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white/90 px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800/80">
                  <FaLock className="text-slate-400" />
                  <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full bg-transparent p-3 outline-none dark:text-slate-100" autoComplete="new-password" aria-label="Confirm Password" />
                  <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="ml-2 text-slate-500 transition hover:text-indigo-600" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:from-indigo-400">
                {loading ? "Creating account..." : "Create Account"}
                <FaArrowRight />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;