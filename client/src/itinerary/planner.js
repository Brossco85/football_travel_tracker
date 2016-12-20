var Itinerary = require('../itinerary');


var Planner = function(){
  this.planner = [];
}

Planner.prototype = {
  addItinerary: function(itinerary){
    this.planner.push(itinerary);
  },
  findItineraryByUser:function(user) {
    var foundItinerary = null;
    for (var itinerary of this.planner) {
      if(itinerary.user === user) {
        foundItinerary = itinerary;
      }
    }
    return foundItinerary;
  },
  persistItinerary: = function(){


    var form = document.getElementById('add-account');
    form.onsubmit = function(e){
      e.preventDefault();

      

      var itinerary = {
        // owner: e.target.owner.value,
        // amount: parseFloat(e.target.amount.value),
        // type: e.target.type.value

        user: "Euan",
        match:req.body.match,
        startTime: req.body.start,
        pubs: req.body.pubs,
        eateries: req.body.eateries,
        hotels: req.body.hotels
      }

      this.planner.addItinerary(new Itinerary(itinerary));
      this.render();
      this.saveAccount(account);
    }.bind(this);

    var interestButton = document.getElementById('interest-button');
    interestButton.onclick = function() {
      this.bank.payInterest(10);
      this.render();
    }.bind(this);
  },

  saveAccount: function(itinerary){
    var url = "http://localhost:3000/itineraries";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function(){
      if(request.status == 200){
        console.log("Itinerary added");
      }
    }
    request.send(JSON.stringify(itinerary));
  }
}


module.exports = Planner;
