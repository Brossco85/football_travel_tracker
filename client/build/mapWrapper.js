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


  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(this.googleMap);


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

var icon = {
          url: 'https://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg', // url
          scaledSize: new google.maps.Size(30, 40), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        MapWrapper.prototype = {
         addMarker: function(coords){
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
           // this.setCenter(coords);
         },
         
        calculateAndDisplayRoute: function() {
              this.directionsService.route({
                origin: {lat: 51.603333, lng: -0.065833},
                destination: {lat: 50.735278, lng: -1.838333},
                travelMode: 'DRIVING'
              }, function(response, status) {
                if (status === 'OK') {
                  this.directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              }.bind(this));
            }
          }

         


         
      

