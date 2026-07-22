import { FaBell, FaClock, FaMobileAlt } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaClock className="text-5xl text-indigo-600" />,
      title: "Save Time",
      description: "Join from anywhere and reduce wasted waiting time with a polished virtual queue experience.",
    },
    {
      icon: <FaBell className="text-5xl text-cyan-600" />,
      title: "Instant Notifications",
      description: "Keep users informed with reliable updates when it is almost their turn.",
    },
    {
      icon: <FaMobileAlt className="text-5xl text-violet-600" />,
      title: "Access Anywhere",
      description: "Track status, manage entries, and stay in the loop from desktop or mobile.",
    },
  ];

  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">Why teams choose SQMS</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Designed for modern, high-trust service experiences.</h2>
          <p className="mt-4 text-lg text-slate-600">Every interaction is intentional, calm, and effortless for both staff and customers.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="section-shell rounded-[24px] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">{feature.icon}</div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;