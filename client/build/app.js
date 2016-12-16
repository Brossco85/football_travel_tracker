window.onload = function() {

  var container = document.getElementById('map');
  var coords = {lat: 51.6032, lng: 0.0657};  
  var mainMap = new MapWrapper(container, coords, 6);
  mainMap.setLocation(coords);

  // mainMap.calculateAndDisplayRoute(directionsService, directionsDisplay);

  mainMap.calculateAndDisplayRoute();

}

// function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//      directionsService.route({
//        origin: {lat: 51.603333, lng: -0.065833},
//        destination: {lat: 50.735278, lng: -1.838333},
//        travelMode: 'DRIVING'
//      }, function(response, status) {
//        if (status === 'OK') {
//          directionsDisplay.setDirections(response);
//        } else {
//          window.alert('Directions request failed due to ' + status);
//        }
//      });
//    }