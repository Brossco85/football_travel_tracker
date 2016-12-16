window.onload = function() {
  var container = document.getElementById('map');
  var coords = {lat: 51.6032, lng: 0.0657};  
  var mainMap = new MapWrapper(container, coords, 6);

  mainMap.setLocation(coords);

  var table = new PremierLeagueTable();
}
