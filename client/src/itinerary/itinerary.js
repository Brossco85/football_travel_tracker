var Itinerary = function(params){
  this.user = params.user;
  this.match = params.match;
  this.startTime = params.startTime;
  this.pubs = params.pubs;
  this.eateries = params.eateries;
  this.hotels = params.hotels;
};

module.exports = Itinerary;