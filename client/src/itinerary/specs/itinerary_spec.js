var Itinerary = require('../itinerary');
var assert = require('assert');

var itinerary;

describe('itinerary', function() {

  beforeEach(function(){
    itinerary = new Itinerary({user:'Bobby', match:"Sat Dec 17 2016 Crystal Palace FC vs Chelsea FC 12:30", startTime: "10:30", pubs: [], eateries: [], hotels: []});
  });

  it('should have user', function() {
    assert.equal(itinerary.user, 'Bobby');
  });

});
