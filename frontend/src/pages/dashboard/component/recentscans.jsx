

const getRiskColor = (risk) => {
  if (risk <= 33) return "text-green-600";
  if (risk <= 66) return "text-yellow-600";
  return "text-red-600";
};

const getRiskLabel = (risk) => {
  if (risk <= 33) return "Low";
  if (risk <= 66) return "Medium";
  return "High";
};

const RecentScans = ({ scans }) => {
  return (
    <div className="mx-4 mb-6 bg-white rounded-xl shadow-sm p-6">

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">Recent</p>
        <h2 className="text-xl font-bold text-gray-800">Saved scans</h2>
      </div>

      {/* Empty state */}
      {scans.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6">
          No scans yet — run a city or manual scan above.
        </p>
      )}

      {/* Scans list */}
      {scans.map((scan, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
          {/* Scan label (city name or "Manual input") */}
          <span className="text-gray-800 font-semibold w-1/3">
            {scan.label}
          </span>

          {/* Risk level label */}
          <span className={`font-medium w-1/4 ${getRiskColor(scan.risk)}`}>
            {getRiskLabel(scan.risk)}
          </span>

          {/* Risk percentage */}
          <span className="text-gray-500 w-1/4">
            {scan.risk}%
          </span>

          {/* Mode + time */}
          <span className="text-gray-400 text-sm text-right w-1/4">
            {scan.mode === "city" ? "City" : "Manual"} - {scan.time}
          </span>

        </div>
      ))}

    </div>
  );
};

export default RecentScans;