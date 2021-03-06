describe('Action: cacheTest', function(){
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

  it('cacheTest: no params', function(done){
    specHelper.apiTest.get("/cacheTest", 0, {}, function(response, json){
      json.error.should.be.equal("Error: key is a required parameter for this action");
      done();
    });
  });

  it('cacheTest: just key', function(done){
    specHelper.apiTest.get("/cacheTest", 0, {key: "test key"}, function(response, json){
      json.error.should.be.equal("Error: value is a required parameter for this action");
      done();
    });
  });

  it('cacheTest: just value', function(done){
    specHelper.apiTest.get("/cacheTest", 0, {value: 'abc123'}, function(response, json){
      json.error.should.be.equal("Error: key is a required parameter for this action");
      done();
    });
  });

  it('cacheTest: gibberish param', function(done){
    specHelper.apiTest.get("/cacheTest", 0, {thingy: "abc123"}, function(response, json){
      json.error.should.be.equal("Error: key is a required parameter for this action");
      should.not.exist(json.requestorInformation.receivedParams['thingy']);
      done();
    });
  });

  it('cacheTest: correct params', function(done){
    specHelper.apiTest.get("/cacheTest", 0, {key: "testKey", value: "abc123"}, function(response, json){
      json.cacheTestResults.saveResp.should.equal(true);
      json.cacheTestResults.loadResp.value.should.equal('abc123');
      json.cacheTestResults.deleteResp.should.equal(true);
      done();
    });
  });

});