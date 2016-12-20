var PremierLeagueFixtures = function(){
  var url2 = 'http://api.football-data.org/v1/competitions/426/fixtures?matchday=17';
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
    var td10 = document.createElement('td');
    var td11 = document.createElement('td');
    var td12 = document.createElement('td');
    var td13 = document.createElement('td');
    var img = document.createElement('img');
    var add = document.createElement('button');
    var view = document.createElement('button');
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
    td10.innerText = "";
    td11.append(add);
    td12.innerText = "";
    td13.append(view);
    add.setAttribute("type", "button");
    add.innerText = "Add";
    view.setAttribute("type", "button");
    view.innerText = "View";
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
    tr.appendChild(td10);
    tr.appendChild(td11);
    tr.appendChild(td12);
    tr.appendChild(td13);
    tr.value = fixture.awayTeamName;
    console.log(tr.value)
    callback();
  }
}

var assignOnClick =function (){
  tables = document.getElementById("fixture-elements");
  cells = tables.getElementsByTagName('tr');
  rows = tables.getElementsByTagName('td');
  // console.log(cells);
  for (var i=0,len=cells.length; i<len; i++){
    cells[i].onclick = function(){
      var home = this.children[4].innerText;
      var away = this.children[6].innerText;
      getFixtureDirections(home, away);
      getHotspots(home);
      }
    }
  }

  var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  }

  var getHotspots = function(homeTeam) {
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
    // var container = document.getElementById('itinerary-list');
    for (var stadium of stadiums) {
      if (stadium.name == homeTeam) { 
        for (i = 0; i < stadium.pubs.length; i++) {
          var li1 = document.createElement('li');
          var li2 = document.createElement('li');
          var li3 = document.createElement('li');
          console.log(stadium.pubs[i].name); 
          li1.innerText = stadium.pubs[0].name;
          li2.innerText = stadium.pubs[1].name;
          li3.innerText = stadium.pubs[2].name;
        }
        for (i = 0; i < stadium.foodOutlets.length; i++) {
          var li4 = document.createElement('li');
          var li5 = document.createElement('li');
          li4.innerText = stadium.foodOutlets[0].name;
          li5.innerText = stadium.foodOutlets[1].name;
        }
        for (i = 0; i < stadium.hotels.length; i++) {
          var li6 = document.createElement('li');
          var li7 = document.createElement('li');
          li6.innerText = stadium.hotels[0].name;
          li7.innerText = stadium.hotels[1].name;
        }
      }
    }
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
