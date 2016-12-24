// var PLStadiums = function(){

//   var url = 'http://localhost:3000/api/stadiums';
//   makeRequest(url, function(){
//     if (this.status !== 200) return;
//   var jsonString = this.responseText;
//   var stadiums = JSON.parse(jsonString);
//   getStadiumData(stadiums); 

//     })
//   }




// var makeRequest = function(url, callback){
//   var request = new XMLHttpRequest();
//   request.open("GET", url);
//   request.onload = callback;
//   request.send();
// }

// // var requestComplete = function(){
// //   if (this.status !== 200) return;
// //   var jsonString = this.responseText;
// //   var stadiums = JSON.parse(jsonString);
// //   getStadiumData(stadiums);
// // }

// var getStadiumData = function(stadiums){
//   var data = [];
//   stadiums.forEach(function(stadium){
//     var stadiData = {};
//     stadiData = {name: stadium.name, crest: stadium.crestURL, stadium: stadium.stadium, latlng: {lat: stadium.latlng[0], lng: stadium.latlng[1]}};
//     data.push(stadiData);
//     addToStadiums(stadiData);

//   })
//     return data;
// }






