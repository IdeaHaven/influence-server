describe('Action: politician', function(){
  var specHelper = require('../helpers/specHelper.js').specHelper;
  var apiObj = {};
  var should = require('should');

  before(function(done){
    this.timeout(20000);
    specHelper.prepare(0, function(api){
      apiObj = specHelper.cleanAPIObject(api);
      done();
    });
  });

  it('politician: no params', function(done){
    this.timeout(20000);
    specHelper.apiTest.get("/politician", 0, {}, function(response, json){
      console.log('length', json.results.length);
      json.results.should.have.lengthOf(100);
      json.results[0].should.have.property('bioguide_id');
      done();
    });
  });

  it('politician: valid id param', function(done){
    this.timeout(20000);
    specHelper.apiTest.get("/politician", 0, {id:5}, function(response, json){
      json.results.should.have.lengthOf(1);
      json.results[0].should.have.property('bioguide_id');
      done();
    });
  });

  it('politician: invalid id param', function(done){
    this.timeout(20000);
    specHelper.apiTest.get("/politician", 0, {id:'xs'}, function(response, json){
      json.results.should.have.lengthOf(100);
      json.results[83].should.have.property('bioguide_id');
      done();
    });
  });

  it('politician: all=true param', function(done){
    this.timeout(20000);
    specHelper.apiTest.get("/politician", 0, {all:true}, function(response, json){
      json.results.should.have.lengthOf(831);
      json.results[150].should.have.property('bioguide_id');
      done();
    });
  });

});
