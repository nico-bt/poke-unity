"use client";

import { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-black mb-2">Welcome!</h2>
        <p className="text-gray-700 mb-6 text-sm">
          This is a Pokemon card manager. You can browse cards, view details,
          and simulate battles.
        </p>

        <div className="bg-gray-100 rounded-xl p-4 mb-6 grid gap-5">
          <p className="font-semibold uppercase tracking-widest text-gray-900">
            Admin access
          </p>
          <p className="text text-gray-800">
            Password:{" "}
            <span className="font-mono font-bold text-2xl pl-1">
              pikachu1234
            </span>
          </p>
          <p className="text-gray-800 mb-4">
            Admins can create and delete pokemon cards.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full cursor-pointer bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
