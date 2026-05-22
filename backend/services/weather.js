import axios from "axios"

export const getWeatherData = async(city) => {

   try {

      const response = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
      )

      return response.data

   } catch(error) {

      console.log(error.message)
   }
}