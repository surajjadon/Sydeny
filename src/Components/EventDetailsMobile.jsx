import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRegUserCircle } from "react-icons/fa";
import { GiFastBackwardButton } from "react-icons/gi";
import { FaShareAlt } from "react-icons/fa";
import GetTicketsModal from "./GetTicketsModal"; // Import the modal

export default function EventDetailsMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false); // State to control the modal visibility

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

  if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
  if (!event) return <div className="p-10 text-center text-red-500">Event not found.</div>;

  const handleTicketContinue = (email, agree) => {
    window.open(event?.url, "_blank", "noopener,noreferrer");
    setShowTicketModal(false);
  };

  const image = event.images?.find(img => img.width >= 800) || event.images?.[0];
  const name = event.name || "Untitled Event";
  const price = event.priceRanges?.[0]?.min
    ? `$${event.priceRanges[0].min.toFixed(2)}`
    : "-";
  const dateObj = event.dates?.start?.localDate
    ? new Date(event.dates.start.localDate)
    : "15-1-2025";
  const dateStr = dateObj
    ? dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBA";
  const timeStr = event.dates?.start?.localTime?.slice(0, 5) || "Time TBA";
  const venue = event._embedded?.venues?.[0]?.name || "Venue TBA";
  const city = event._embedded?.venues?.[0]?.city?.name || "";
  const address = event._embedded?.venues?.[0]?.address?.line1 || "";
  const description = event.info || event.description || "No description available.";
  const ticketUrl = event.url;
  const notes = event.pleaseNote || "Everyone is allowed";
   const url = event.url || "#";
   const venueAddress = `${venue}, ${address}${city ? ", " + city : ""}`;
    const genres = [
    event.classifications?.[0]?.segment?.name,
    event.classifications?.[0]?.genre?.name,
    event.classifications?.[0]?.subGenre?.name,
  ].filter(Boolean);

  // Description logic: Clean raw HTML content
  const cleanDescription = description => {
    // If the description is just plain text, return it
    if (description && !description.includes('<')) {
      return description;
    }

    // Otherwise, sanitize HTML content (for simplicity, this just removes script tags)
    const doc = new DOMParser().parseFromString(description, 'text/html');
    return doc.body.textContent || "";
  };

  const displayDescription = cleanDescription(description);

  // Description preview logic
  const descPreview = displayDescription.length > 120 ? displayDescription.slice(0, 120) + "..." : displayDescription;

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <div className="relative w-full h-90">
        <img
          src={image?.url}
          alt={name}
          className="w-full h-full object-cover bg-purple-600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/80 via-purple-800/60 to-transparent" />
        <button
          className="absolute top-20 left-4 bg-white bg-opacity-100 rounded-full p-3 shadow-lg z-20 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <GiFastBackwardButton className="text-purple-800 text-xl" />
        </button>

        {/* Share Button */}
        <button
          className="absolute top-20 right-4 bg-white bg-opacity-80 rounded-full p-3 shadow-lg z-20 cursor-pointer"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: name, url: ticketUrl });
            } else {
              navigator.clipboard.writeText(ticketUrl);
              alert("Event link copied!");
            }
          }}
        >
          <FaShareAlt className="text-purple-800 text-xl" />
        </button>

        {/* Heading and Event Details */}
        <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg mb-3 sm:mb-4 whitespace-normal px-2 max-w-full text-center">
            {name}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base">
            <span className="flex items-center gap-1 sm:gap-2">
              <FaCalendarAlt className="text-yellow-300" />
              {dateStr}
            </span>
            {timeStr && (
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
        </div>

        <button
          className="absolute bottom-5 right-1/2 transform translate-x-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow transition text-sm sm:text-lg mt-0.5 cursor-pointer"
          onClick={() => setShowTicketModal(true)}
        >
          🎫 GET TICKETS
        </button>
      </div>
<div className="px-6">

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4">About This Event</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-6 sm:mb-8">
            {displayDescription}
          </p>
          {notes && (
            <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 sm:p-5 rounded mb-6 sm:mb-8">
              <div className="font-semibold text-orange-900 mb-2 text-lg">Please Note</div>
              <div className="text-gray-700 text-sm sm:text-sm">{notes}</div>
            </div>
          )}
        </div>
      </div>


      <div className="w-full md:w-96 flex-shrink-0">
                  <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <h3 className="text-xl :text-xl font-bold mb-3 sm:mb-4">Event Details</h3>
                    <div className="mb-2 sm:mb-3">
                      <div className="text-gray-600 text-lg sm:text-lg font-semibold mb-1">Date and Time</div>
                      <div className="flex items-center gap-2 mb-1 text-lg sm:text-lg">
                        <FaCalendarAlt className="text-purple-700" />
                        <span>{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg sm:text-xl">
                        <FaClock className="text-purple-700" />
                        <span>{timeStr}</span>
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-3">
                      <div className="text-gray-600 text-lg sm:text-xl font-semibold mb-1">Location</div>
                      <div className="flex items-center gap-2 text-lg sm:text-xl">
                        <FaMapMarkerAlt className="text-purple-700" />
                        <span>{venueAddress}</span>
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-3">
                      <div className="text-gray-600 text-lg sm:text-xl font-semibold mb-1">Event Type</div>
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
                          <span className="text-gray-500 text-lg sm:text-xl italic">Not specified</span>
                        )}
                      </div>
                    </div>
                    <button
                      className="block w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 sm:py-3 rounded-lg text-center mt-3 sm:mt-4 transition text-lg sm:text-xl cursor-pointer"
                      onClick={() => setShowTicketModal(true)}
                    >
                      🎫 GET TICKETS
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border border-purple-200 text-purple-800 font-semibold py-2 sm:py-3 rounded-lg text-center mt-2 transition hover:bg-purple-50 text-lg sm:text-xl cursor-pointer"
                    >
                      View on Ticketmaster
                    </a>
                  </div>
                </div>


       <div className="fixed bottom-0 left-0 w-full px-4 pb-4 bg-gradient-to-t from-white via-white/90 to-transparent z-20">
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-2xl text-lg shadow-lg mt-4 cursor-pointer"
          onClick={() => setShowTicketModal(true)}
        >
          Buy Ticket
        </button>
      </div>

      <GetTicketsModal
        open={showTicketModal}
        onClose={() => setShowTicketModal(false)} 
        eventTitle={name}
        onContinue={handleTicketContinue}
      />
      </div>
    </div>
  );
}
