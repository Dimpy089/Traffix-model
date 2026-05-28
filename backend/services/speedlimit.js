import axios from "axios"

export const getSpeedLimit =
async(lat, lon) => {

   const query = `
   [out:json];

   way(around:100,${lat},${lon})
   ["highway"];

   out tags;
   `;

   const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
         headers: {
            "Content-Type": "text/plain"
         }
      }
   )

   const roads = response.data.elements

   if(!roads.length){
      return 50
   }

   const road = roads[0]

   return parseInt(
      road.tags.maxspeed
   ) || 50

}