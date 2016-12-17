var MapWrapper = function(container, center, zoom){
 this.googleMap = new google.maps.Map(container, {
   center: center, 
   zoom: zoom
 });

 google.maps.event.addDomListener(window, "resize", function() {
  var center = this.googleMap.getCenter();
  console.log(center);
  google.maps.event.trigger(this.googleMap, "resize");
  this.googleMap.setCenter(center);
}.bind(this));

}

// var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
// var icons = {
//  parking: {
//    icon: iconBase + 'parking_lot_maps.png'
//  },
//  library: {
//    icon: iconBase + 'library_maps.png'
//  },
//  info: {
//    icon: iconBase + 'info-i_maps.png'
//  }
// };

// var icon = {
//           url: 'https://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg', // url
//           scaledSize: new google.maps.Size(30, 40), // scaled size
//           origin: new google.maps.Point(0,0), // origin
//           anchor: new google.maps.Point(0, 0) // anchor
//         };

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
 initDirections: function(){

  var markerArray = [];

  var directionsService = new google.maps.DirectionsService;

  var directionsDisplay = new google.maps.DirectionsRenderer({map: this.googleMap});

  var stepDisplay = new google.maps.InfoWindow;

  calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, this.googleMap);

// var onChangeHandler = function() {
//   calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
// };
// document.getElementById('start').addEventListener('change', onChangeHandler);
// document.getElementById('end').addEventListener('change', onChangeHandler);

}

}


function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
  for (var i = 0; i < markerArray.length; i++) {
   markerArray[i].setMap(null);
 }
 directionsService.route({origin: "penn station, new york, ny", destination: "350 5th Ave, New York, NY, 10118",
   travelMode: 'DRIVING'
 }, function(response, status) {
  if (status === 'OK') {
    document.getElementById('warnings-panel').innerHTML =
    '<b>' + response.routes[0].warnings + '</b>';
    directionsDisplay.setDirections(response);
    showSteps(response, markerArray, stepDisplay, map);
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
