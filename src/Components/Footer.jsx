import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#181c29] text-gray-200 pt-12 pb-6 px-4 mt-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 border-b border-gray-700 pb-8">
        {/* Brand & Description */}
        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-yellow-400 rounded p-1">
              <FaCalendarAlt className="text-[#181c29] text-lg" />
            </span>
            <span className="font-extrabold text-xl text-white">Sydney Events</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Discover the best events happening in Sydney.<br />
            From concerts and festivals to sports and theater, find it all in one place.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
              <FaInstagram />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="font-bold text-lg text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Events</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">About Us</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Contact</Link>
            </li>
          </ul>
        </div>
        {/* Contact Us */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-bold text-lg text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-400" />
              <span>Updated daily with the latest events</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              <a href="mailto:info@sydneyevents.com" className="hover:text-yellow-400 transition">
                surajsingh.jadon.phe22@iitbhu.ac.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-xs text-gray-400">
        <div>
          © {new Date().getFullYear()} Sydney Events. All rights reserved.
        </div>
        <div>
          Powered by Suraj Singh Jadon. This is a demonstration project.
        </div>
      </div>
    </footer>
  );
}
