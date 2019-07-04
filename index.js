const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error)
//   } else {
//     console.log("It work! Returned IP:", ip);
//   }
// });

// fetchCoordsByIP(("66207.199.230"), (data, error) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log("Here are the coodinates:", data);
//   }
// });

fetchISSFlyOverTimes(({latitude: '43.63830', longitude: '-79.43010'}), (data, error) => {
  if (error) {
    console.log("It didn't work!", error);
  } else {
    console.log("Here are the flyover times:", data);
  }
});