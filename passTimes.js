const printPassTimes = function(passTimes) {
  for (let time of passTimes) {
    let pass = new Date(time.risetime * 1000);
    console.log(`Next pass at ${pass} for ${time.duration} seconds!`);
  }
};

module.exports = { printPassTimes};