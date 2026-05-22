import { getWeatherData } from "../services/weather.js"
import { getLightingCondition } from "../services/lighting.js"

export const predictAccident = async(req, res) => {

   try {

      const { city } = req.body

      const weather = await getWeatherData(city)
      const lighting = getLightingCondition()
      
      res.json({
         success: true,
         weather,
         lighting
      })

   } catch(error) {

      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}