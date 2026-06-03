

import { useState } from "react";
import Header from "./components/Header";
import PredictionInput from "./components/PredictionInput";
import PredictionOutput from "./components/PredictionOutput";
import RecentScans from "./components/RecentScans";

const DashboardPage = () => {

  // This is the result we get back after a scan
  const [predictionResult, setPredictionResult] = useState(null);

  // This is the list of all past scans shown at the bottom
  const [recentScans, setRecentScans] = useState([]);

  // When a scan completes, we update result + add to recent list
  const handleScanComplete = (result) => {
    setPredictionResult(result);
    setRecentScans((prev) => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top bar */}
      <Header />

      {/* Main two-panel section */}
      <div className="flex gap-4 p-4">

        {/* Left panel — user inputs city or manual data */}
        <PredictionInput onScanComplete={handleScanComplete} />

        {/* Right panel — shows the risk result */}
        <PredictionOutput result={predictionResult} />

      </div>

      {/* Bottom section — saved scans history */}
      <RecentScans scans={recentScans} />

    </div>
  );
};

export default DashboardPage;