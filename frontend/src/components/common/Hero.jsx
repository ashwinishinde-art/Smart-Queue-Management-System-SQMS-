import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBolt, FaCheckCircle, FaClock, FaShieldAlt } from "react-icons/fa";
import heroImage from "../../assets/images/hero.svg";

function Hero() {
  const highlights = [
    "Live queue visibility",
    "Smart notifications",
    "Mobile-first experience",
  ];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.18),_transparent_40%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
            <FaBolt />
            Premium queue orchestration for modern teams
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Skip the wait.
            <span className="gradient-text block">Own the experience.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            SQMS gives your users a calm, reliable way to join queues, receive updates, and stay in control from anywhere.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              Get Started <FaArrowRight />
            </Link>
            <Link to="/login" className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
              Sign In
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <FaCheckCircle className="text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-indigo-500/20 via-cyan-400/20 to-fuchsia-500/20 blur-3xl" />
          <div className="glass-panel relative overflow-hidden rounded-[32px] border border-white/70 p-4 shadow-2xl">
            <img src={heroImage} alt="Smart Queue" className="w-full rounded-[24px]" />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600">
                  <FaClock />
                  <span className="text-sm font-semibold">Live ETA</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">4 min</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-600">
                  <FaShieldAlt />
                  <span className="text-sm font-semibold">Secure</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">100%</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FaCheckCircle />
                  <span className="text-sm font-semibold">Ready</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">24/7</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;