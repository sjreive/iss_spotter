const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  console.log("Getting IP...")
  request.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request.get(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let coords = {};

    callback(JSON.parse(body, (key, value) => {
      if (key === "latitude" || key === "longitude") {
        coords[key] = value;
      }
      return coords;
    }
    ), null);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request.get(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(null, error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(null, Error(msg));
      return;
    }
    const passTimes = JSON.parse(body).response;
    callback(passTimes, null);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    console.log("I've got the IP! Fetching Coordinates...");
    fetchCoordsByIP(ip, (coords, error) => {
      if (error) {
        return callback(null, coords);
      }
      console.log("I've got the Coordinates! Fetching Fly-Over Times...");
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(null, error);
        }
        callback(null, passTimes);   
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};

