var mapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
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