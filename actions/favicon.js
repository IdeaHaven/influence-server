exports.action = {
  name: "favicon",
  description: "favicon",
  inputs: {
    required: ["company"],
    optional: [],
  },
  blockedConnectionTypes: [],
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    var exec, result, callback, company;

    exec = require('child_process').exec;
    company = connection.params.company;
    Favicon = require('../helpers/dbModels.js').Favicon;

    // check database for company name
    Favicon.find({ company: company }, function(err, data){
      if(data.length > 0){
        console.log('URL for '+company+' found in database.');
        connection.response.favicon = {url: data[0].url};
        next(connection, true);
      } else {
        // next(connection, true); // this disables scraping
        scrape();  // this enables scraping
      }
    });

    // if not in databse run the scraper
    scrape_callback = function(){
      console.log(result.url);
      connection.response.favicon = result;
      next(connection, true);
      Favicon.create({company: company, url: result.url}, function (err){
        err && console.log('Error writing new url ', err);
      });
    };

    scrape = function(){
      console.log('URL for '+company+' not in database, scraping...')
      exec('phantomjs ./helpers/phantom-scrapeLogo.coffee ' + company,
          function (error, stdout, stderr) {
              console.log(stdout, stderr);      // Always empty
              result = JSON.parse(stdout);
              scrape_callback();
          }
      );
    };

  }
};
