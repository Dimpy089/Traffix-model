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

      const weather = await getWeatherData(city)

      const coordinates = await getCoordinates(city)
    
       const totalCount = countAccidentsByLocation(city);
       //by coordinates i am getting curvature and speedlimit lat and lon
      const { lat, lon } = coordinates

      const curvature = await getRoadCurvature(lat, lon)

         const lightingCondition =
         getLightingCondition()


         const speedlimit=await getSpeedLimit(lat, lon)


              //taking all the required parameters and sending it to ml model for prediction
     const mlResponse = await fetch("http://localhost:5001/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    curvature: curvature,
    speed_limit: speedlimit,
    lighting: lightingCondition,
    weather: weather,
    num_reported_accidents: totalCount
  })
});

const mlResult = await mlResponse.json();

   res.json({
  success: true,
  curvature,
  speedlimit,
  lightingCondition,
  weather,
  totalAccidents: totalCount,
  prediction: mlResult.prediction
    });

   } catch(error) {

      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

module.exports = { predictAccident };