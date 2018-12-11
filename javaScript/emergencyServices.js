// TODO: Add directions from user's location to Emergency Service
// TODO: Give estimates of the time it would take for the user to arrive at emergency service with different modes of transport
// TODO: Read user's GPS location or allow user to enter their location
// TODO: Show markers of all chosen emrgency service on the map.

let latLngA, latLngB, latA, latB, lngA, lngB;
latA = 2.8;
latB = 3.1;
lngA = -187.3;
lngB = -190;
latLngA = new google.maps.LatLng(latA, lngA);
latLngB = new google.maps.LatLng(latB, lngB);
let distance = google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
console.log(distance);