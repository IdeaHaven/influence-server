var orm = require("orm");

exports.dbConnect = function(api, next){

  var opts = {
    database : "d6lv2nn7kpjr5a",
    protocol : "postgres",
    host     : "ec2-54-221-236-4.compute-1.amazonaws.com",
    port     : 5432,         // optional, defaults to database default
    user     : "ymptfeckyuumiy",
    password : "wYdegzBBoyvOvIL3RPGzYpECUE",
    ssl      : true,
    query    : {
      pool     : false,   // optional, false by default
      debug    : false,   // optional, false by default
      strdates : false    // optional, false by default
    }
  };

  orm.connect(opts, function (err, db){
    if(err) { console.log('error', err); next(); }
    else if(db) {
      require('./dbModels.js').create(api, next, db);
    }
  });
};
