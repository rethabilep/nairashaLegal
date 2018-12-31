let map, service, infowindow;
let place =  {lat: -29.3151, lng: 27.4869};
let serviceType = window.location.href;
let index = serviceType.indexOf('search=');
serviceType = serviceType.substring(index+7);
const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    }
];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: place, //DONE: Center to be user's location if GPS enabled.
        zoom: 15,
        styles: mapStyle,
    });
    infoWindow = new google.maps.InfoWindow;
// Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
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


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};


// TODO: Create a database((JSON) of all health services, police stations and half-way homes in Lesotho
// TODO: Find/Create appropriate images/icons to represent health services, police stations and half-way homes
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
