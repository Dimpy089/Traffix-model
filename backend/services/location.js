const axios = require("axios");

const getCoordinates = async(city) => {

   try {

      const response = await axios.get(
         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
      )

      const location = response.data[0]
     

      if (!location) {
  throw new Error("City not found or coordinates unavailable");
   }
      return {
         lat: location.lat,
         lon: location.lon
      }

  } catch (error) {
  throw new Error("Failed to get coordinates: " + error.message);
}
}

module.exports = { getCoordinates };