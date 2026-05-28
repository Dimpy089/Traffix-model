import axios from "axios"

export const getCoordinates = async(city) => {

   try {

      const response = await axios.get(
         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
      )

      const location = response.data[0]

      return {
         lat: location.lat,
         lon: location.lon
      }

   } catch(error){

      console.log(error.message)
   }
}