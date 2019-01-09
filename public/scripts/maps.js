let map, service, userPos, directionsDisplay, infoWindow, directionsService, places;
let serviceType = window.location.href;
let index = serviceType.indexOf('search=');
serviceType = serviceType.substring(index+7);
let icon = "img/markers/"+serviceType+"_marker.png";
// const apiKey = "AIzaSyC-8trTGc8RoSXOWhnawqg0KKQMbEUIXwM";
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
    console.log(map.center);
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
            console.log(map.center);
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
        // TODO: Add search validation in the backend. All service type keywords to be singular.
    }, callback);
    map.setCenter(userPos);
    console.log(map.center);
    directionsDisplay.setMap(map);
    // map.data.setStyle(place => {
    //     return {
    //         icon: {
    //             url: `img/${place.getServiceType('category')}.png`,
    //             scaledSize: new google.maps.Size(64, 64)
    //         }
    //     };
    // });

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
        position: place.geometry.location,
        title: place.name,
        icon: icon
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

function labelPlace(place) {
    let placeLoc = place.geometry.location;
    let infoWindow = new google.maps.InfoWindow();
    let name = place.name;
    infoWindow.setContent(name);
    infoWindow.setPosition(placeLoc);
    // infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);

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

/*
 TODO: Create a database((JSON) of all health services, police stations and half-way homes in Lesotho
 TODO: Add directions from user's location to Emergency Service
 TODO: Give estimates of the time it would take for the user to arrive at emergency service with different modes of transport
 TODO: Read user's GPS location or allow user to enter their location
 TODO: Show markers of all chosen emergency service on the map.



 map.data.addListener('click', event => {
     let category = event.feature.getProperty('category');
     let name = event.feature.getProperty('name');
     let description = event.feature.getProperty('description');
     let hours = event.feature.getProperty('hours');
     let phone = event.feature.getProperty('phone');
     let position = event.feature.getGeometry().get();
     let content = `
     <img style="float:left; width:200px; margin-top:30px" src="img/logo_${category}.png">
     <div style="margin-left:220px; margin-bottom:20px;">
       <h2>${name}</h2><p>${description}</p>
       <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
       <p><img src="https://maps.googleapis.com/maps/api/streetview?size=350x120&location=${position.lat()},${position.lng()}&key=${apiKey}"></p>
     </div>
   `;
     infoWindow.setContent(content);
     infoWindow.setPosition(position);
     infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
     infoWindow.open(map);
 });
*/