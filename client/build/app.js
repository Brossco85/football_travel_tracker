window.onload = function() {
  var container = document.getElementById('map');
  var coords = {lat: 51.6032, lng: 0.0657};  
  var mainMap = new MapWrapper(container, coords, 6);

  mainMap.setLocation(coords);

  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
  var jsonString = this.responseText;
  var stadiums = JSON.parse(jsonString);
  var allStadiums = getStadiumData(stadiums); 

  for(var stadium of allStadiums){
    mainMap.addMarker(stadium.latlng);
  };
    })
  }


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

// var requestComplete = function(){
//   if (this.status !== 200) return;
//   var jsonString = this.responseText;
//   var stadiums = JSON.parse(jsonString);
//   getStadiumData(stadiums);
// }

var getStadiumData = function(stadiums){
  var data = [];
  stadiums.forEach(function(stadium){
    var stadiData = {};
    stadiData = {name: stadium.name, crest: stadium.crestURL, stadium: stadium.stadium, latlng: {lat: stadium.latlng[0], lng: stadium.latlng[1]}};
    data.push(stadiData);

  })
    return data;
}
