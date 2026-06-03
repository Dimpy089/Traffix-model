// src/pages/Dashboard/components/PredictionInput.jsx

import { useState } from "react";

const PredictionInput = ({ onScanComplete }) => {

  // Which tab is active — "city" or "manual"
  const [mode, setMode] = useState("city");

  // City mode input
  const [city, setCity] = useState("");

  // Manual mode inputs
  const [manualData, setManualData] = useState({
    curvature,
    weather: "",
    lighting: "",
    accidents,
    speedlimit
  });

  const [loading, setLoading] = useState(false);

  // Handle manual input changes
  const handleManualChange = (e) => {
    setManualData({ ...manualData, [e.target.name]: e.target.value });
    // e.target.name=weather 
    // then e.target.value=rainy or whatever selcted 
  };

  // Called when user clicks the scan button
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // We will replace this URL with real API later
      const payload = mode === "city"
        ? { mode: "city", city }
        : { mode: "manual", ...manualData };

      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Pass result up to DashboardPage
      onScanComplete({
        ...data,
        mode,
        label: mode === "city" ? city : "Manual input",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 w-1/2 shadow-sm">

      {/* Section label */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
        Prediction Input
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Risk scan</h2>

      {/* City / Manual toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("city")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
            ${mode === "city"
              ? "bg-teal-700 text-white"
              : "bg-gray-100 text-gray-600"}`}
        >
          City
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
            ${mode === "manual"
              ? "bg-teal-700 text-white"
              : "bg-gray-100 text-gray-600"}`}
        >
          Manual
        </button>
      </div>

      {/* City mode form */}
      {mode === "city" && (
        <div>
          <label className="text-sm text-gray-600 mb-1 block">City</label>
          <input
            type="text"
            placeholder="Mumbai"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      {/* Manual mode form */}
      {mode === "manual" && (
        <div className="flex flex-col gap-3 mb-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Weather</label>
            <input
              type="text"
              name="weather"
              placeholder="e.g. Rainy"
              value={manualData.weather}
              onChange={handleManualChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Lighting</label>
            <input
              type="text"
              name="lighting"
              placeholder="e.g. Low"
              value={manualData.lighting}
              onChange={handleManualChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Accidents</label>
            <input
              type="text"
              name="accidents"
              placeholder="e.g. 3"
              value={manualData.accidents}
              onChange={handleManualChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition disabled:opacity-50"
      >
        {loading ? "Scanning..." : `-> Run ${mode} scan`}
      </button>

    </div>
  );
};

export default PredictionInput;