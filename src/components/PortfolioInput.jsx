import React, { useState } from "react";

export default function PortfolioInput({ setPortfolio }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const symbols = input.split(",").map((s) => s.trim().toUpperCase());
    setPortfolio(symbols);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-2/3"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter stock symbols comma-separated (e.g., TCS, INFY)"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}