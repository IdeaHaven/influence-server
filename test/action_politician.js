describe('Action: politicians', function(){
  var specHelper = require('../helpers/specHelper.js').specHelper;
  var apiObj = {};
  var should = require('should');

  before(function(done){
    this.timeout(5000);
    specHelper.prepare(0, function(api){
      apiObj = specHelper.cleanAPIObject(api);
      done();
    });
  });

  it('politicians: no params', function(done){
    specHelper.apiTest.get("/politicians", 0, {}, function(response, json){
      json.results.should.have.lengthOf(100);
      json.results[0].should.have.property('bioguide_id');
      done();
    });
  });

  it('politicians: valid id param', function(done){
    specHelper.apiTest.get("/politicians", 0, {id:5}, function(response, json){
      json.results.should.have.lengthOf(1);
      json.results[0].should.have.property('bioguide_id');
      done();
    });
  });

  it('politicians: invalid id param', function(done){
    specHelper.apiTest.get("/politicians", 0, {id:'xs'}, function(response, json){
      json.results.should.have.lengthOf(100);
      json.results[83].should.have.property('bioguide_id');
      done();
    });
  });

  it('politicians: all=true param', function(done){
    specHelper.apiTest.get("/politicians", 0, {all:true}, function(response, json){
      json.results.should.have.lengthOf(832);
      json.results[150].should.have.property('bioguide_id');
      done();
    });
  });
  // xit('cacheTest: just value', function(done){
  //   specHelper.apiTest.get("/cacheTest", 0, {value: 'abc123'}, function(response, json){
  //     json.error.should.be.equal("Error: key is a required parameter for this action");
  //     done();
  //   });
  // });

  // xit('cacheTest: gibberish param', function(done){
  //   specHelper.apiTest.get("/cacheTest", 0, {thingy: "abc123"}, function(response, json){
  //     json.error.should.be.equal("Error: key is a required parameter for this action");
  //     should.not.exist(json.requestorInformation.receivedParams['thingy']);
  //     done();
  //   });
  // });

  // xit('cacheTest: correct params', function(done){
  //   specHelper.apiTest.get("/cacheTest", 0, {key: "testKey", value: "abc123"}, function(response, json){
  //     json.cacheTestResults.saveResp.should.equal(true);
  //     json.cacheTestResults.loadResp.value.should.equal('abc123');
  //     json.cacheTestResults.deleteResp.should.equal(true);
  //     done();
  //   });
  // });

});