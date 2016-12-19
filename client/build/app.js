var app = function() {
  var container = document.getElementById('map');
  var coords = {lat: 51.6032, lng: 0.0657};  
  var mainMap = new MapWrapper(container, coords, 6);

  // mainMap.setLocation(coords);


  var table = new PremierLeagueTable();
  var fixtures = new PremierLeagueFixtures();
  var feed = new FootballFeed();


  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);
    var allStadiums = getStadiumData(stadiums);
    getClubNames(allStadiums);

    for(var stadium of allStadiums){
      var icon = {
                  url: stadium.crest, // url
                  scaledSize: new google.maps.Size(20, 30), // scaled size
                  origin: new google.maps.Point(0,0), // origin
                  anchor: new google.maps.Point(0, 0) // anchor
                };
                mainMap.addMarker(stadium.latlng, icon);
              };

            })


  var select = document.querySelector('#team');
  select.addEventListener('change', function(e){getStadiumCoords(e.target.value, mainMap)
  })


  var tables = document.getElementById("fixture-elements");
      cells = tables.getElementsByTagName('tr');

  for (var i=0,len=cells.length; i<len; i++){
      cells[i].onclick = function(){
          console.log(this.innerHTML);
          /* if you know it's going to be numeric:
          console.log(parseInt(this.innerHTML),10);
          */
      }
  }


  // var tables = document.getElementById("fixture-elements");
  //   console.log(tables.rows.length);
  //       for (var i = 0; i < tables.rows.length; i++) {
  //           tables.rows[i].onclick = function (e) {
  //               console.log(e.target.value);
  //           };
  //       }
    }



  // rows.addEventListener('click', function(e){console.log(e.target.value);getStadiumCoords(e.target.value, mainMap)})
  // for (var row in rows) {
  //   row.addEventListener('click', function(e){getStadiumCoords(e.target.value, mainMap);
  // var tableRow = document.querySelector('#away-team')
  // tableRow.addEventListener('click', function(e){getStadiumCoords(e.target.value, mainMap)})

// })




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

var getClubNames = function(stadiums){
  var select = document.querySelector('#team');
  for (var i = 0; i < stadiums.length; i++) {
    var option = document.createElement('option') ;
    option.innerText = stadiums[i].name;
    option.value = i;
    // console.log(option.value)
    select.appendChild(option); 
  }
}

var getStadiumCoords = function(index, map){
  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);
    var allStadiums = getStadiumData(stadiums);
    // console.log(allStadiums[index].latlng.lat)
    var coords = {};
    coords = {lat: allStadiums[index].latlng.lat, lng: allStadiums[index].latlng.lng};
    map.setCenter(coords);
    // map.satelliteCloseUp();
    var origin = {lat: 51.6032, lng: 0.0657};
    var destination = coords;
    map.initDirections(origin, destination);
  })
}


window.onload = app;

