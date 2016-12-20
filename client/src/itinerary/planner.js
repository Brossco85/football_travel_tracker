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
  }

}

module.exports = Planner;
