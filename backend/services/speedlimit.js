const axios = require("axios");

const getSpeedLimit = async (lat, lon) => {
  try {
    const query = `
    [out:json];
    way(around:100,${lat},${lon})["highway"];
    out tags;
    `;

   const response = await axios.post(
  "https://overpass-api.de/api/interpreter",
  new URLSearchParams({ data: query }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "traffic-risk-backend/1.0"
    }
  }
);

    const roads = response.data.elements;

    if (!roads.length) {
      return 50;
    }

    const road = roads[0];

    return parseInt(road.tags.maxspeed) || 50;
  } catch (error) {
    console.log(error.message);
    return 50;
  }
};


module.exports = { getSpeedLimit };