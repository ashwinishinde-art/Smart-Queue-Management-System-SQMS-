import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold text-white">SQMS</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Premium queue management for modern services, crafted to make every wait feel effortless and transparent.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/" className="transition hover:text-white">Home</Link></li>
              <li><Link to="/login" className="transition hover:text-white">Login</Link></li>
              <li><Link to="/register" className="transition hover:text-white">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Contact</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@sqms.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub />
                <span>github.com/your-repo</span>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin />
                <span>linkedin.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} SQMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;