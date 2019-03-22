export class Doctor {

getDoctor(condition) {
  const apiKey = process.env.exports.apiKey;
  return new Promise(function(resolve, reject) {
  const request = new XMLHttpRequest();
  const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=45.451726, -122.828,323&limit=10&user_key=${apiKey}`;
  request.onload = function() {
    if (this.status === 200) {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  }
    request.open("GET", url, true);
    request.send();
  });

}

}
