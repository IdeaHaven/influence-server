var orm = require("orm");

exports.dbConnect = function(api, next){

  var opts = {
    database : "d7nc6q0ltq20n3",
    protocol : "postgres",
    host     : "ec2-54-221-229-7.compute-1.amazonaws.com",
    port     : 5432,         // optional, defaults to database default
    user     : "mvtsikecshryig",
    password : "OW81TUWeV1BsPzxEAs_hi58wyZ",
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
