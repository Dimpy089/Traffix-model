import axios from "axios"

export const getRoadCurvature = async(lat, lon) => {

   try {

      const query = `
      [out:json];
      way(around:100, ${lat}, ${lon})["highway"];
      out geom;

//       Find roads within 100m
// around this location
// and return their coordinates
      `

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
    

      //roads.length is number of road as roads storing aray of road  in this format
      //  {
      // "type": "way",
      // "id": 12345,
      // "tags": {
      //    "highway": "primary",
      //    "maxspeed": "60"
      // }


      if(!roads.length){
         return "Low"
      }

      const geometry = roads[0].geometry

      if(geometry.length < 3){
         return "Low"
      }

      let curvatureScore = 0

      for(let i = 1; i < geometry.length - 1; i++){

         const prev = geometry[i - 1]
         const curr = geometry[i]
         const next = geometry[i + 1]

//      We take 3 nearby road points: previous, current, and next.  
// Then we compare how much the latitude and longitude change between these points.  
// If the direction change is small, the road is mostly straight (low curvature).  
// If the direction change is large, the road has sharp turns (high curvature).  
// Math.abs() is used to measure only the amount of turning, not the direction.

         const angleChange =
            Math.abs((next.lat - curr.lat) - (curr.lat - prev.lat)) +
            Math.abs((next.lon - curr.lon) - (curr.lon - prev.lon))

         curvatureScore += angleChange
      }

      if(curvatureScore > 0.01){
         return "High"
      }

      if(curvatureScore > 0.005){
         return "Medium"
      }

      return "Low"

   } 
   catch(error){

      console.log(error.message)

      return "Unknown"
   }
}