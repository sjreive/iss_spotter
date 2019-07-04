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
  request.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null,JSON.parse(body));
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request.get(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(null, error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(null, Error(msg));
      return;
    }
    let newObj = {};
    callback(JSON.parse(body, (key, value) => {
      if (key === "latitude" || key === "longitude") {
        newObj[key] = value;
      }
      return newObj;
    }
    ), null);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  console.log(coords.latitude, coords.longitude);
  request.get(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(null, error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(null, Error(msg));
      return;
    }
    callback(JSON.parse(body), null);
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};