// drop the table then re-add it from the csv on server boot
exports.Politician = function(api, next, db){
  var Politician;
  Politician = require('./dbModels').Politician;
  Politician.sync(function (err) {
    err ? console.log('Error Syncing Politician Table: ', err) : console.log('Table Synced');

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
        next();
      });
    });
    // init read from file
    csvConverter.from(csvFileName);

  });
};