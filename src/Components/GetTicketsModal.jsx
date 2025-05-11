import React, { useEffect, useState } from "react";

export default function GetTicketsModal({ open, onClose, eventTitle, onContinue }) {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = () => {
    if (!email || !agree || submitting) return;
    setSubmitting(true);
    onContinue(email, agree);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 backdrop-blur-sm bg-white/10" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-8 mx-4 z-50">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Get Tickets for {eventTitle}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            className="mt-1 mr-2"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            I agree to receive updates about events in my area. I can unsubscribe at any time.
          </span>
        </div>
        <div className="flex gap-3">
          <button
            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 cursor-pointer"
            onClick={handleClick}
            disabled={!email || !agree || submitting}
          >
            {submitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
