exports.database = function(api, next){
  require('../helpers/dbConnect.js').dbConnect(api, next);
};
