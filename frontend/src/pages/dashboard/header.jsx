

const Header = () => {
  return (
    <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">

      {/* Left side — title */}
      <div>
        <p className="text-gray-400 text-xs tracking-widest uppercase">
          Traffic Operations
        </p>
        <h1 className="text-white text-2xl font-bold">
          Accident Risk Predictor
        </h1>
      </div>

      {/* Right side — status badges */}
      <div className="flex gap-3">

        {/* <span className="bg-gray-700 text-gray-300 text-sm px-4 py-1 rounded-full">
          ML service: 127.0.0.1:5001
        </span>

        <span className="bg-gray-700 text-gray-300 text-sm px-4 py-1 rounded-full">
          Backend: Express
        </span> */}

      </div>

    </div>
  );
};

export default Header;