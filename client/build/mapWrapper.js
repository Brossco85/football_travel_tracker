var MapWrapper = function(container, center, zoom){
 this.googleMap = new google.maps.Map(container, {
   center: center, 
   zoom: zoom
 });

directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
   directionsDisplay.setMap(this.googleMap);
   directionsDisplay.setPanel(document.getElementById('directions'));

  google.maps.event.addDomListener(window, "resize", function() {
    var center = this.googleMap.getCenter();
    google.maps.event.trigger(this.googleMap, "resize");
    this.googleMap.setCenter(center);
  }.bind(this));


}



MapWrapper.prototype = {
 addMarker: function(coords, icon){
   var marker = new google.maps.Marker({
     position: coords,
     icon: icon,
     map: this.googleMap
   })
 },
 setCenter: function(coords){
   this.googleMap.setCenter(coords);
 },
 setLocation: function(coords){
   this.addMarker(coords);
   this.setCenter(coords);
 },
 initDirections: function(origin, destination){

  
  var markerArray = [];
  // var directionsService = new google.maps.DirectionsService;
  // var directionsDisplay = null;
  var stepDisplay = new google.maps.InfoWindow;
  calculateAndDisplayRoute(markerArray, stepDisplay, this.googleMap, origin, destination);

// var onChangeHandler = function() {
//   calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
// };
// document.getElementById('start').addEventListener('change', onChangeHandler);
// document.getElementById('end').addEventListener('change', onChangeHandler);

},
satelliteCloseUp: function(){
  this.googleMap.setMapTypeId('satellite');
  this.googleMap.setZoom(17);
}

}

function getLocation() {
  var container = document.getElementById('map');
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = {lat: latitude, lng: longitude};
    var mainMap = new MapWrapper(container, location, 10);
    mainMap.addMarker(location);
  }

  function error() {
    container.innerHTML = "Unable to retrieve your location";
  }
  container.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}


function calculateAndDisplayRoute(markerArray, stepDisplay, map, origin, destination) {
 directionsService.route({origin: origin, destination: destination,
   travelMode: 'DRIVING'
 }, function(response, status) {
  if (status === 'OK') {
    document.getElementById('warnings-panel').innerHTML =
    '<b>' + response.routes[0].warnings + '</b>';
    document.getElementById("directions").innerHTML = "";
    directionsDisplay.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
});
}
function showSteps(directionResult, markerArray, stepDisplay, map) {
      // For each step, place a marker, and add the text to the marker's infowindow.
      // Also attach the marker to an array so we can keep track of it and remove it
      // when calculating new routes.
      var myRoute = directionResult.routes[0].legs[0];
      for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
      }
    }

    function attachInstructionText(stepDisplay, marker, text, map) {
      google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
      });
    }

    
