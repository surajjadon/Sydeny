import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";

export default function Hero({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSearch && onSearch(search);
      setSearch("");
    }
  };

  return (
    <section className="relative bg-purple-900 text-white overflow-hidden pb-20">
      {/* Background pattern with dots */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto pt-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Discover Sydney's Best <br className="hidden md:inline" /> Events
        </h1>
        <p className="text-lg md:text-xl mb-8 font-medium">
          Find concerts, sports, theater, and more all in one place
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <span className="inline-flex items-center bg-purple-800 rounded-full px-4 py-2 text-sm font-semibold text-white gap-2">
            <FaCalendar className="w-4 h-4 text-yellow-300" />
            Events Updated Daily
          </span>
          <span className="inline-flex items-center bg-purple-800 rounded-full px-4 py-2 text-sm font-semibold text-white gap-2">
            <FaLocationDot className="w-4 h-4 text-yellow-300" />
            Sydney, Australia
          </span>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex items-center bg-white rounded-full shadow-lg w-full max-w-2xl p-2"
        >
          <input
            type="text"
            className="flex-grow bg-transparent outline-none px-4 py-2 text-gray-800 placeholder-gray-400 rounded-full"
            placeholder="Browse all events below..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-6 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-full font-semibold transition cursor-pointer"
          >
            Explore
          </button>
        </form>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full -mb-1"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,74.7C672,75,768,85,864,90.7C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32V100H1392C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100H0V64Z"
        />
      </svg>
    </section>
  );
}
