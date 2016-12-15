var MapWrapper = function(container, center, zoom){
 this.googleMap = new google.maps.Map(container, {
   center: center, 
   zoom: zoom
 });
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
           this.setCenter(coords);
         }

       }

