import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Header({ onSearch }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSearch && onSearch(search);
      setSearch(""); 
      if (isOpen) setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-t border-black shadow-sm bg-gray-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-3 px-4 sm:px-8">
       <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3v2.25M8.25 3v2.25M3 7.5h18M4.5 7.5v11.25a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V7.5m-15 0a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25" />
          </svg>
          <span className="font-bold text-lg text-black">Sydney Events</span>
        </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
         <Link to="/" className="text-purple-800 font-medium hover:text-purple-950 cursor-pointer">
  Home
</Link>
          <form onSubmit={handleSubmit} className="flex items-center space-x-1">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-purple-800 text-white rounded-full hover:bg-purple-900 active:bg-purple-900 transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50"
        >
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="text-purple-800 font-medium hover:text-purple-950 cursor-pointer">
  Home
</Link>
            <form onSubmit={handleSubmit} className="flex items-center space-x-1">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-800 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
