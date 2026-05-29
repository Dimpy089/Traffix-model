const { getWeatherData } = require("../services/weather");
const { getLightingCondition } = require("../services/lighting");
const { getCoordinates } = require("../services/location");
const { getRoadCurvature } = require("../services/curvature");
const { getSpeedLimit } = require("../services/speedlimit");
const {countAccidentsByLocation} = require('../services/countAccident');

const predictAccident  = async(req, res) => {

   try {
   //for curvature from overpass api we need lattitude and longitude so we will convrt city to lat,long using geocoding api
//        City Name
//     ↓
// Geocoding API
//     ↓
// Coordinates
//     ↓
// Road Geometry API
//     ↓
// Curvature Detection
   
  const { city } = req.body

      if (!city) {
         return res.status(400).json({
            success: false,
            message: "City is required"
         });
      }

      const weather = await getWeatherData(city)

      const coordinates = await getCoordinates(city)
    
       const totalCount = countAccidentsByLocation(city);
       //by coordinates i am getting curvature and speedlimit lat and lon
      const { lat, lon } = coordinates

      const curvature = await getRoadCurvature(lat, lon)

         const lightingCondition =
         getLightingCondition()


         const speedlimit=await getSpeedLimit(lat, lon)

 //for making all the thing same as ml model
         const mlCurvature =
            curvature === "High" ? 0.8 :
            curvature === "Medium" ? 0.5 :
            curvature === "Low" ? 0.2 :
            0.2;

         const mlLighting =
            lightingCondition.toLowerCase() === "day" ? "daylight" : "night";

         const weatherMain = weather.weather?.[0]?.main?.toLowerCase() || "";

         let mlWeather = "clear";
         if (weatherMain.includes("rain") || weatherMain.includes("thunderstorm")) {
            mlWeather = "rainy";
         } else if (
            weatherMain.includes("fog") ||
            weatherMain.includes("mist") ||
            weatherMain.includes("haze")
         ) {
            mlWeather = "foggy";
         }

              //taking all the required parameters and sending it to ml model for prediction
   //   const mlResponse = await fetch("http://localhost:5001/predict", {
   

   // sometimes Node tries localhost through IPv6 ::1, while Flask is listening on IPv4 127.0.0.1
     const mlResponse = await fetch("http://127.0.0.1:5001/predict", {

  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
 body: JSON.stringify({
  curvature: mlCurvature,
  speed_limit: speedlimit,
  lighting: mlLighting,
  weather: mlWeather,
  num_reported_accidents: totalCount
})
});

const mlResponseText = await mlResponse.text();

if (!mlResponse.ok) {
   throw new Error(
      `ML prediction service failed with status ${mlResponse.status}: ${mlResponseText}`
   );
}

const mlResult = JSON.parse(mlResponseText);
const riskScore = mlResult.prediction;
const riskLevel =
   riskScore >= 0.7 ? "High" :
   riskScore >= 0.4 ? "Medium" :
   "Low";

  res.json({
  success: true,
  city,
  riskScore,
  riskLevel,
  summary: {
    lighting: mlLighting,
    weather: mlWeather,
    totalAccidents: totalCount,
    speedlimit,
    curvature
  }
});

   } catch(error) {

      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

module.exports = { predictAccident };
