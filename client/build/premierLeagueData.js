var PremierLeagueTable = function(){
  var url = 'http://api.football-data.org/v1/competitions/426/leagueTable';
  makeRequest(url, requestComplete);

}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "795581b721014c898569d2bee06c9012");
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var league = JSON.parse(jsonString);
  createLeagueTable(league);
}

var createLeagueTable = function(leagueData){
  var standing = leagueData.standing;
  var select = document.getElementById('table');
    for (i = 0; i < standing.length; i++) {
      var li = document.createElement('li');
      var team = standing[i];
      console.log(team);
      li.innerText = team.teamName;
      table.appendChild(li);
    }
}

