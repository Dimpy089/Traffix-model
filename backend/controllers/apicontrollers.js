const { getWeatherData } = require("../services/weather");
const { getLightingCondition } = require("../services/lighting");
const { getCoordinates } = require("../services/location");
const { getRoadCurvature } = require("../services/curvature");
const { getSpeedLimit } = require("../services/speedlimit");
const {countAccidentsByLocation} = require('../services/countAccident');

export const predictAccident = async(req, res) => {

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

      res.json({
         success: true,
         weather,
         curvature,
         lightingCondition,
         speedlimit,
         totalAccidents: totalCount
      })

   } catch(error) {

      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}