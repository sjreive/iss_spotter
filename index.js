const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error)
  } else {
    for (let time of passTimes) {
      let pass = new Date(time.risetime*1000);
      console.log(`Next pass at ${pass} for ${time.duration} seconds!`);
    }
  }
});