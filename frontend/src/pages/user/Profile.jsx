import { useEffect, useState } from "react";
import { FaArrowLeft, FaCamera, FaCheckCircle, FaEnvelope, FaSpinner, FaTimes, FaUserCircle, FaUserTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("user") || "null"));
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const userRoleLabel = user?.role === "student" ? "User" : user?.role;

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    setUser(storedUser);
    setFormData({ fullName: storedUser?.fullName || "", email: storedUser?.email || "" });
    setPreview(storedUser?.avatar || null);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setIsDirty(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 800));

    const updatedUser = { ...user, fullName: formData.fullName.trim(), email: formData.email.trim(), avatar: preview };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsDirty(false);
    setIsSaving(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData({ fullName: user?.fullName || "", email: user?.email || "" });
    setPreview(user?.avatar || null);
    setIsDirty(false);
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-slate-950">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <DashboardNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col items-center text-center">
              <label className="group relative cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <div className="relative overflow-hidden rounded-full border border-white/60 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-1 shadow-lg">
                  {preview ? (
                    <img src={preview} alt="Profile preview" className="h-24 w-24 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-indigo-600">
                      <FaUserCircle size={70} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/40 opacity-0 transition group-hover:opacity-100">
                    <FaCamera className="text-2xl text-white" />
                  </div>
                </div>
              </label>

              <h2 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">{user?.fullName || "Your Profile"}</h2>
              <span className="mt-3 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{userRoleLabel || "Member"}</span>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
                <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                  <FaEnvelope />
                  <p className="text-sm font-semibold uppercase tracking-[0.28em]">Account Overview</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{user?.email || "No email available"}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
                  <p className="mt-1 text-lg font-semibold capitalize text-slate-900 dark:text-slate-100">{userRoleLabel || "member"}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <FaCheckCircle />
                    <p className="text-sm font-semibold">Profile sync ready</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your updates are reflected instantly in your session and remain available after refresh.</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400">
                  <FaUserTag />
                  <p className="text-sm font-semibold uppercase tracking-[0.28em]">Edit Profile</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button onClick={() => navigate("/dashboard")} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <FaArrowLeft />
                    Back to Dashboard
                  </button>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={handleCancel} disabled={!isDirty} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      <FaTimes />
                      Cancel
                    </button>

                    <button onClick={handleSave} disabled={isSaving || !isDirty} className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:from-indigo-400">
                      {isSaving ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
