let map, service, userPos, infoWindow, directionsDisplay, directionsService, places;
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
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -29.3151, lng: 27.4869},
        zoom: 15,
        styles: mapStyle,
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(userPos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(userPos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: {lat: -29.3151, lng: 27.4869},
        radius: 20000,
        type: [serviceType]
    }, callback);
    directionsDisplay.setMap(map);
}

function callback(results, status) {
    places = results;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(place, userPos);
        }
    }
}


function createMarker(place, userPos) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    marker.addListener('click', function(){
        enterPlace(place);
        calculateAndDisplayRoute(userPos, placeLoc);
        eventFire(document.getElementById('DRIVING'),'click');
        eventFire(document.getElementById('starting-point'), 'focus');
        eventFire(document.getElementById('starting-point'), 'blur');
        eventFire(document.getElementById('destination'), 'focus');
        eventFire(document.getElementById('destination'), 'blur');
        map.setZoom(15);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function enterPlace(place) {
    $("#destination").val(place.name);
    $("#starting-point").val("Your current location");

}

function calculateAndDisplayRoute(origin, destination, selectedMode="DRIVING") {
    console.log(origin);
    directionsService.route({
        origin: origin,  // User's input
        destination: destination,  // Selected destination
        travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

$(".travel_mode").click(function () {
    let selectedMode = this.id;
    let placeLoc;
    for (let i =0; i<places.length; i++){
        if (places[i].name === $("#destination").val()) {
            placeLoc = places[i].geometry.location;
        }
    }
    calculateAndDisplayRoute(userPos, placeLoc, selectedMode);
});

// TODO: Create a database((JSON) of all health services, police stations and half-way homes in Lesotho
// TODO: Find/Create appropriate images/icons to represent health services, police stations and half-way homes
// TODO: Add directions from user's location to Emergency Service
// TODO: Give estimates of the time it would take for the user to arrive at emergency service with different modes of transport
// TODO: Read user's GPS location or allow user to enter their location
// TODO: Show markers of all chosen emrgency service on the map.