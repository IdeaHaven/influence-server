// drop the table then re-add it from the csv on server boot
exports.all = function(api, next, db){
  var Politician, Favicon, tempNext;
  Politician = require('./dbModels').Politician;
  Favicon = require('./dbModels').Favicon;

  Politician.sync(function (err) {
    err ? console.log('Error Syncing Politician Table: ', err) : console.log('Politician Table Synced');
    tempNext();
  });

  tempNext = function(){
    Favicon.sync(function (err) {
      err ? console.log('Error Syncing Favicon Table: ', err) : console.log('Favicon Table Synced');
      next();
    });
  };

};