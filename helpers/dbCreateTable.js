// drop the table then re-add it from the csv on server boot
exports.all = function(api, next, db){
  var Politician, Favicon, tempNext;
  Politician = require('./dbModels').Politician;
  Favicon = require('./dbModels').Favicon;

  Politician.sync(function (err) {
    err ? console.log('Error Syncing Politician Table: ', err) : console.log('Politician Table Synced');

    // csv file convert to json
    var Converter, csvFileName, csvConverter;
    //Converter Class
    Converter=require("csvtojson").core.Converter;
    //CSV File Path or CSV String or Readable Stream Object
    csvFileName="/tmp/legislators.txt";
    //new converter instance
    csvConverter=new Converter();
    //end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed",function(jsonObj){
      jsonFromCsv = jsonObj; //here is your result json object
      console.log('JSON created');
      Politician.create(jsonObj.csvRows, function (err){
        err && console.log('Error writing new items ', err);
        tempNext();
      });
    });
    // init read from file
    csvConverter.from(csvFileName);

  });

  tempNext = function(){
    Favicon.sync(function (err) {
      err ? console.log('Error Syncing Favicon Table: ', err) : console.log('Favicon Table Synced');
      next();
    });
  };

};