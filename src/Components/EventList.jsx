import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function EventList({ events, totalElements, currentPage, totalPages, onLoadMore }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  if (!events?.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No events found.
      </div>
    );
  }

  const total = events.length;
  const showing = Math.min(visibleCount, total);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, total));
    if (onLoadMore) onLoadMore();
  };

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen px-8">
      <div className="mb-6 text-gray-700 text-lg font-medium">
        Showing {showing} of {total} events
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {events.slice(0, visibleCount).map((event) => {
          const image =
            event.images?.find((img) => img.width >= 400) || event.images?.[0];
          const category =
            event.classifications?.[0]?.segment?.name ||
            event.classifications?.[0]?.genre?.name ||
            "Event";
          const categoryColor = "bg-purple-800";
          const dateObj = event.dates?.start?.localDate
            ? new Date(event.dates.start.localDate)
            : null;
          const dateStr = dateObj
            ? dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : event.dates?.start?.localDate || "TBA";
          const timeStr =
            event.dates?.start?.localTime?.slice(0, 5) ||
            (event.dates?.start?.dateTBD ? "TBA" : null);
          const venue =
            event._embedded?.venues?.[0]?.name ||
            event._embedded?.venues?.[0]?.address?.line1 ||
            "Venue TBA";

          return (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={image?.url}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${categoryColor}`}
                >
                  {category}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-4">
                <h3 className="font-semibold text-lg text-purple-900 mb-2 line-clamp-2">
                  {event.name}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <FaCalendarAlt className="mr-2 text-purple-700" />
                  {dateStr}
                </div>
                {event.dates?.start?.localTime && (
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <FaClock className="mr-2 text-purple-700" />
                    {event.dates.start.localTime}
                  </div>
                )}
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <FaMapMarkerAlt className="mr-2 text-purple-700" />
                  {venue}
                </div>
                <button
                  className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded transition cursor-pointer"
                  onClick={() => handleViewDetails(event.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < total && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition cursor-pointer "
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
