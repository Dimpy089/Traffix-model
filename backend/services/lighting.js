 const getLightingCondition = () => {

   const hour = new Date().getHours()

   if(hour >= 6 && hour < 18){ 
    //6 AM → 5:59 PM
      return "daylight"
   }

   return "night"
}


module.exports = { getLightingCondition };