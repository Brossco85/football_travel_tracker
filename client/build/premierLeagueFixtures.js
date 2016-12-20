var PremierLeagueFixtures = function(){
  var url2 = 'http://api.football-data.org/v1/competitions/426/fixtures?matchday=18';
  makeRequest2(url2, requestComplete2);
}

var makeRequest2 = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "795581b721014c898569d2bee06c9012");
  request.onload = callback;
  request.send();
}

var requestComplete2 = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var fixturesData = JSON.parse(jsonString);
  createFixturesTable(fixturesData, assignOnClick);
}

var createFixturesTable = function(fixturesData, callback){
  var fixtures = fixturesData.fixtures;
  var table = document.getElementById('fixture-elements');
  for (i = 0; i < fixtures.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute("class", "click-fixture");
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');
    var img = document.createElement('img');
    var fixture = fixtures[i];
    var dateAndTime = fixture.date;
    var date = new Date(dateAndTime);
    td1.innerText = fixture.matchday;
    td2.innerText = "";
    td3.innerText = date.toDateString();
    td4.innerText = "";
    td5.innerText = fixture.homeTeamName;
    td6.innerText = "";
    td7.innerText = fixture.awayTeamName;
    td8.innerText = "";
    td9.innerText = date.toUTCString().slice(16,22);
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.value = fixture.awayTeamName;
    callback();
  }
}

var getDirectionsLocation = function(homeTeam, awayTeam){
  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);
    var allStadiums = getStadiumData(stadiums);
    var homeCoords = {};
    var awayCoords = {};
    for (var stadium of allStadiums){  
      if (stadium.name === homeTeam){
        var homeCoords = {lat: stadium.latlng.lat, lng: stadium.latlng.lng};
      } else if (stadium.name === awayTeam){
        var awayCoords = {lat: stadium.latlng.lat, lng: stadium.latlng.lng};
      }
    }
    var container = document.getElementById('map');
    var coords = {lat: 51.6032, lng: 0.0657};  
    var mainMap = new MapWrapper(container, coords, 6);

    mainMap.initDirections(awayCoords, homeCoords);
  })
}


var assignOnClick =function (){
  tables = document.getElementById("fixture-elements");
  cells = tables.getElementsByTagName('tr');
  rows = tables.getElementsByTagName('td');
  for (var i=0,len=cells.length; i<len; i++){
    cells[i].onclick = function(){
      var home = this.children[4].innerText;
      var away = this.children[6].innerText;
      var fixture = this.innerText;
      getHotspots(home, fixture);
      showHotspots(home);
      getFixtureDirections(home, away);
    }
  }
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var createCheckbox = function(name) {
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = "value";
  checkbox.id = "id";

  var label = document.createElement('label')
  label.htmlFor = "id";
  label.appendChild(document.createTextNode(name));

  return [checkbox, label];
}

var getHotspots = function(homeTeam, fixture) {
    var url = 'http://localhost:3000/api/accounts';
    makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);
    document.getElementById('bars').innerHTML = "";
    document.getElementById('food').innerHTML = "";
    document.getElementById('hotels').innerHTML = "";
    var bars = document.getElementById('bars');
    var foodOutlets = document.getElementById('food');
    var hotels = document.getElementById('hotels');
    var itineraryList = document.getElementById('itinerary-list');
    itineraryList.innerText = fixture;
    
    for (var stadium of stadiums) {
      if (stadium.name == homeTeam) {
        for (i = 0; i < stadium.pubs.length; i++) {
          var li1 = document.createElement('li');
          var li1Return = createCheckbox(stadium.pubs[0].name)

          var li2 = document.createElement('li');
          var li2Return = createCheckbox(stadium.pubs[1].name);

          var li3 = document.createElement('li');
          var li3Return = createCheckbox(stadium.pubs[2].name);
        }
        for (i = 0; i < stadium.foodOutlets.length; i++) {
          var li4 = document.createElement('li');
          var li4Return = createCheckbox(stadium.foodOutlets[0].name);

          var li5 = document.createElement('li');
          var li5Return = createCheckbox(stadium.foodOutlets[1].name);
        }
        for (i = 0; i < stadium.hotels.length; i++) {
          var li6 = document.createElement('li');
          var li6Return = createCheckbox(stadium.hotels[0].name);

          var li7 = document.createElement('li');
          var li7Return = createCheckbox(stadium.hotels[1].name);
        }
      }
    }
    
    li1.appendChild(li1Return[0]);
    li1.appendChild(li1Return[1]);

    li2.appendChild(li2Return[0]);
    li2.appendChild(li2Return[1]);

    li3.appendChild(li3Return[0]);
    li3.appendChild(li3Return[1]);

    li4.appendChild(li4Return[0]);
    li4.appendChild(li4Return[1]);

    li5.appendChild(li5Return[0]);
    li5.appendChild(li5Return[1]);

    li6.appendChild(li6Return[0]);
    li6.appendChild(li6Return[1]);

    li7.appendChild(li7Return[0]);
    li7.appendChild(li7Return[1]);
   
    bars.appendChild(li1);
    bars.appendChild(li2);
    bars.appendChild(li3);
    foodOutlets.appendChild(li4);
    foodOutlets.appendChild(li5);
    hotels.appendChild(li6);
    hotels.appendChild(li7);
  })
  }

var getFixtureDirections = function(homeTeam, awayTeam){
  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);
    var allStadiums = getStadiumData(stadiums);
    var homeCoords = {};
    var awayCoords = {};
    for (var stadium of allStadiums){  
      if (stadium.name === homeTeam){
        var homeCoords = {lat: stadium.latlng.lat, lng: stadium.latlng.lng};
      } else if (stadium.name === awayTeam){
        var awayCoords = {lat: stadium.latlng.lat, lng: stadium.latlng.lng};
      }
    }
    var container = document.getElementById('map');
    var coords = {lat: 51.6032, lng: 0.0657};  
    var mainMap = new MapWrapper(container, coords, 6);

    mainMap.initDirections(awayCoords, homeCoords);
  })
}

var viewButton = function() {
    var popup = document.getElementById('myPopup');
        popup.classList.toggle('show');;
}

var showHotspots = function(homeTeam) {
  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var stadiums = JSON.parse(jsonString);

    var container = document.getElementById('itinerary-map');

    for (var stadium of stadiums) {
      if (stadium.name == homeTeam) {
        var coords = {lat: stadium.latlng[0], lng: stadium.latlng[1]};
        var pubsArray = []
        var foodOutletsArray = []
        var hotelsArray = []
        var itineraryMap = new MapWrapper(container, coords, 11);

        for (i = 0; i < stadium.pubs.length; i++) {
          itineraryMap.itineraryMarker({lat: stadium.pubs[i].latlng[0], lng: stadium.pubs[i].latlng[1]});
        }
        for (i = 0; i < stadium.foodOutlets.length; i++) {
          itineraryMap.itineraryMarker({lat: stadium.foodOutlets[i].latlng[0], lng: stadium.foodOutlets[i].latlng[1]});
        }
        for (i = 0; i < stadium.hotels.length; i++) {
          itineraryMap.itineraryMarker({lat: stadium.hotels[i].latlng[0], lng: stadium.hotels[i].latlng[1]});
        }
      }
    }
  })
}


