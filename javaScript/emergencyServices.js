let map;
let service;
let infowindow;
let place =  {lat: -29.3151, lng: 27.4869};
let serviceType = window.location.href;
let index = serviceType.indexOf('search=');
serviceType = serviceType.substring(index+7);
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: place, //TODO: Center to be user's location if GPS enabled.
        zoom: 15,
    });
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: place,
        radius: 20000,
        type: [serviceType]
    }, callback);
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(place);
        }
    }
}

function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
// TODO: Add directions from user's location to Emergency Service
// TODO: Give estimates of the time it would take for the user to arrive at emergency service with different modes of transport
// TODO: Read user's GPS location or allow user to enter their location
// TODO: Show markers of all chosen emrgency service on the map.
// $(document).ready(function () {
//     let latLngA, latLngB, latA, latB, lngA, lngB;
//     latA = 2.8;
//     latB = 3.1;
//     lngA = -187.3;
//     lngB = -190;
//     latLngA = new google.maps.LatLng(latA, lngA);
//     latLngB = new google.maps.LatLng(latB, lngB);
//     let distance = google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
//     console.log(distance);
// });
