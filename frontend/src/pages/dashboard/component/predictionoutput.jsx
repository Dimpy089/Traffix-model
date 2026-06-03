
const PredictionOutput = ({ result }) => {

  // If no scan yet, result is null — we show empty/pending state
  const isPending = !result;

  // Risk % decides the color of the badge
  const getRiskColor = (risk) => {
    if (risk <= 33) return "text-green-600 bg-green-100";
    if (risk <= 66) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRiskLabel = (risk) => {
    if (risk <= 33) return "Low";
    if (risk <= 66) return "Medium";
    return "High";
  };

  return (
    <div className="bg-white rounded-xl p-6 w-1/2 shadow-sm">

      {/* Section label */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
        Prediction Output
      </p>

      {/* Title + status badge */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Risk profile</h2>

        {isPending ? (
          <span className="bg-gray-100 text-gray-500 text-sm px-4 py-1 rounded-full">
            Pending
          </span>
        ) : (
          <span className={`text-sm px-4 py-1 rounded-full font-medium ${getRiskColor(result.risk)}`}>
            {getRiskLabel(result.risk)}
          </span>
        )}
      </div>

      {/* Risk gauge bar — green to red gradient */}
      <div className="relative w-full h-3 rounded-full mb-4"
        style={{ background: "linear-gradient(to right, #86efac, #fde68a, #fca5a5)" }}
      >
        {/* Marker dot showing exact risk position */}
        {!isPending && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-700 rounded-full shadow"
            style={{ left: `calc(${result.risk}% - 8px)` }}
          />
        )}
      </div>

      {/* Risk percentage display */}
      {!isPending && (
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-sm font-bold px-3 py-1 rounded ${getRiskColor(result.risk)}`}>
            {getRiskLabel(result.risk)}
          </span>
          <span className="text-gray-700 font-semibold">{result.risk}%</span>
        </div>
      )}

      {/* 4 info cards */}
      <div className="grid grid-cols-2 gap-3 mt-2">

        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Location</p>
          <p className="text-gray-800 font-semibold">
            {isPending ? "Awaiting scan" : result.location || result.label || "--"}
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Lighting</p>
          <p className="text-gray-800 font-semibold">
            {isPending ? "--" : result.lighting || "--"}
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Weather</p>
          <p className="text-gray-800 font-semibold">
            {isPending ? "--" : result.weather || "--"}
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Accidents</p>
          <p className="text-gray-800 font-semibold">
            {isPending ? "--" : result.accidents || "--"}
          </p>
        </div>

      </div>

    </div>
  );
};

export default PredictionOutput;