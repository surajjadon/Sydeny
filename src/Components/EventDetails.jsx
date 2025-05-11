import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import GetTicketsModal from "./GetTicketsModal";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=jdCpz1WN0JvFtKEyAIe290mrYOGejNA9`
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name || "Event",
        url: event?.url || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(event?.url || window.location.href);
      alert("Event link copied!");
    }
  };

 const handleTicketContinue = async (email, agree) => {
  try {
    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, agree, eventTitle: event?.name })
    });

    window.open(event?.url, "_blank", "noopener,noreferrer");
    setShowTicketModal(false);
  } catch (error) {
    alert("Submission failed. Please try again.");
    console.error("Error:", error);
  }
};


  if (loading) return <div className="p-10 text-center text-gray-600">Loading event details...</div>;
  if (!event) return <div className="p-10 text-center text-red-500">Event not found.</div>;

  const image = event.images?.find((img) => img.width >= 800) || event.images?.[0];
  const name = event.name || "Untitled Event";
  const url = event.url || "#";
  const category = event.classifications?.[0]?.segment?.name || "General";
  const localDate = event.dates?.start?.localDate || "No Date Available";
  const localTime = event.dates?.start?.localTime || "No time";
  const dateObj = localDate ? new Date(localDate) : null;
  const dateStr = dateObj
    ? dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBA";
  const timeStr = localTime?.slice(0, 5) || "Time TBA";
  const venue = event._embedded?.venues?.[0]?.name || "Venue TBA";
  const address = event._embedded?.venues?.[0]?.address?.line1 || "Address TBA";
  const city = event._embedded?.venues?.[0]?.city?.name || "";
  const venueAddress = `${venue}, ${address}${city ? ", " + city : ""}`;
  const description = event.info || event.description || "No description available.";
   const notes = event.pleaseNote || "Everyone is allowed";
  const genres = [
    event.classifications?.[0]?.segment?.name,
    event.classifications?.[0]?.genre?.name,
    event.classifications?.[0]?.subGenre?.name,
  ].filter(Boolean);

  return (
    <>
      <div className="relative min-h-screen bg-gray-100 overflow-y-auto">
        <GetTicketsModal
          open={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          eventTitle={name}
          onContinue={handleTicketContinue}
        />
        <button
          onClick={() => navigate(-1)}
          className="fixed top-20 left-4 z-50 px-3 py-2 rounded shadow text-yellow-800 bg-white/80 hover:bg-purple-900 hover:text-white font-medium flex items-center cursor-pointer text-sm sm:text-base"
        >
          <span className="text-xl mr-1">&larr;</span> Back to events
        </button>

        {/* Header Image and Info */}
        <div className="relative w-full h-48 sm:h-64 md:h-96 flex items-end justify-center">
          {image && (
            <img
              src={image.url}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/60 to-transparent" />
          <div className="relative z-10 flex flex-col items-center pb-6 sm:pb-8 w-full px-2 sm:px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg mb-3 sm:mb-4">
              {name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-white text-xs sm:text-base">
              <span className="flex items-center gap-1 sm:gap-2">
                <FaCalendarAlt className="text-yellow-300" />
                {dateStr}
              </span>
              {localTime && (
                <span className="flex items-center gap-1 sm:gap-2">
                  <FaClock className="text-yellow-300" />
                  {timeStr}
                </span>
              )}
              <span className="flex items-center gap-1 sm:gap-2">
                <FaMapMarkerAlt className="text-yellow-300" />
                {venue}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full justify-center">
             
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow transition text-sm sm:text-lg"
                onClick={() => setShowTicketModal(true)}
              >
                🎫 GET TICKETS
              </button>

              <button
                className="bg-white/20 hover:bg-white/40 text-white font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow flex items-center gap-2 transition text-sm sm:text-lg"
                onClick={handleShare}
              >
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        </div>


        {/* Details Section */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10 flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">About This Event</h2>
            <p className="text-gray-700 text-xs sm:text-base mb-6 sm:mb-8">{description}</p>
            {notes && (
              <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 sm:p-5 rounded mb-6 sm:mb-8">
                <div className="font-semibold text-orange-900 mb-2">Please Note</div>
                <div className="text-gray-700 text-xs sm:text-sm">{notes}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-96 flex-shrink-0">
            <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Event Details</h3>
              <div className="mb-2 sm:mb-3">
                <div className="text-gray-600 text-xs sm:text-sm font-semibold mb-1">Date and Time</div>
                <div className="flex items-center gap-2 mb-1 text-xs sm:text-sm">
                  <FaCalendarAlt className="text-purple-700" />
                  <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FaClock className="text-purple-700" />
                  <span>{timeStr}</span>
                </div>
              </div>
              <div className="mb-2 sm:mb-3">
                <div className="text-gray-600 text-xs sm:text-sm font-semibold mb-1">Location</div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FaMapMarkerAlt className="text-purple-700" />
                  <span>{venueAddress}</span>
                </div>
              </div>
              <div className="mb-2 sm:mb-3">
                <div className="text-gray-600 text-xs sm:text-sm font-semibold mb-1">Event Type</div>
                <div className="flex flex-wrap gap-2">
                  {genres.length ? (
                    genres.map((g, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs sm:text-sm italic">Not specified</span>
                  )}
                </div>
              </div>
              <button
                className="block w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 sm:py-3 rounded-lg text-center mt-3 sm:mt-4 transition text-sm sm:text-base"
                onClick={() => setShowTicketModal(true)}
              >
                🎫 GET TICKETS
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-purple-200 text-purple-800 font-semibold py-2 sm:py-3 rounded-lg text-center mt-2 transition hover:bg-purple-50 text-xs sm:text-base"
              >
                View on Ticketmaster
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
