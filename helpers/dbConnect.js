var orm = require("orm");

module.exports = function(){
  return orm.connect("postgres://influence:plantlife@localhost/influence_db", function (err, db){
    if(err) { console.log("Something is wrong with the connection", err); return; }
    if(db)  { console.log('Connected to influence_db'); }
  });
};
