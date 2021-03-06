// drop the table then re-add it from the csv on server boot
exports.Politician = function(api, next, db){
  db.driver.execQuery("DROP TABLE politician", function (err, data) {
    if (data){
      console.log('Politician Table Dropped...')
      var Politician = require('./dbModels').Politician;
      Politician.sync(function (err) {
        err ? console.log('Error Syncing Politician Table: ', err) : console.log('Politician Table Synced...');

        // csv file convert to json
        var Converter, csvFileName, csvConverter;
        //Converter Class
        Converter=require("csvtojson").core.Converter;
        //CSV File Path or CSV String or Readable Stream Object
        csvFileName="/tmp/legislators.csv";
        //new converter instance
        csvConverter=new Converter();
        //end_parsed will be emitted once parsing finished
        csvConverter.on("end_parsed",function(jsonObj){
          jsonFromCsv = jsonObj; //here is your result json object
          console.log('JSON created from: ', csvFileName);
          console.log('Writing JSON to Politican Table...');
          Politician.create(jsonObj.csvRows, function (err){
            err ? console.log('Error Writing JSON to Politician Table: ', err) : console.log('JSON Successfully written to Politician Table.');
            next();
          });
        });
        // init read from file
        csvConverter.from(csvFileName);

      });

    }
    else if(err){ console.log('Error Dropping Table: ', err); next();}
  });
};