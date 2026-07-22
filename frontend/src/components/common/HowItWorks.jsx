import { FaBell, FaChartLine, FaCheckCircle, FaTicketAlt, FaUserPlus } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    { icon: <FaUserPlus />, title: "Register", desc: "Create your account in seconds and get ready to join." },
    { icon: <FaTicketAlt />, title: "Book Queue", desc: "Select a service and receive your personal token instantly." },
    { icon: <FaChartLine />, title: "Track Status", desc: "Follow live progress and see where you stand in line." },
    { icon: <FaBell />, title: "Get Notification", desc: "Receive a timely reminder when your turn is close." },
    { icon: <FaCheckCircle />, title: "Visit", desc: "Arrive with confidence and only when it is genuinely needed." },
  ];

  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-600">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">A calm, clear flow from start to finish.</h2>
          <p className="mt-4 text-lg text-slate-600">Using SQMS feels simple, friendly, and reassuring at every step.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <div key={index} className="section-shell rounded-[24px] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-2xl text-white">
                {step.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;