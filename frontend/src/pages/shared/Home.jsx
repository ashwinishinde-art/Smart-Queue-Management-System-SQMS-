import { FaCheckCircle, FaQuoteRight } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";

function Home() {
  const testimonials = [
    {
      quote: "The experience feels dramatically smoother for our clients and staff alike.",
      name: "Mina Chen",
      role: "Operations Lead",
    },
    {
      quote: "It brings clarity to the whole waiting experience, which is exactly what we needed.",
      name: "Daniel Brooks",
      role: "Customer Success",
    },
  ];

  const faqs = [
    {
      question: "Can I use SQMS for any service desk?",
      answer: "Yes. The experience is flexible and can be tailored to your queue flow, department, or service setup.",
    },
    {
      question: "Is the platform mobile friendly?",
      answer: "Absolutely. Each workflow is designed to feel polished on phones, tablets, and desktops.",
    },
    {
      question: "Does it support live updates?",
      answer: "Yes. Users receive timely progress updates and notifications without needing to refresh constantly.",
    },
  ];

  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-indigo-100 bg-white/80 p-8 shadow-xl backdrop-blur sm:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">Loved by teams</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">A premium experience that feels effortless from day one.</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <FaQuoteRight className="text-2xl text-indigo-500" />
                <p className="mt-4 text-lg text-slate-700">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white">{item.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl sm:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-400">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Everything you need to know before you get started.</h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-100">
                  <span>{item.question}</span>
                  <FaCheckCircle className="text-cyan-400" />
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;