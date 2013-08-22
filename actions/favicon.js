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

    callback = function(){
      console.log(result.url);
      connection.response.favicon = result;
      next(connection, true);
    };

    exec('phantomjs ./helpers/phantom-scrapeLogo.coffee ' + company,
        function (error, stdout, stderr) {
            console.log('running...');
            console.log(stdout, stderr);      // Always empty
            result = JSON.parse(stdout);
            callback();
        }
    );

  }
};
