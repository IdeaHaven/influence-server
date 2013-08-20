var orm = require("orm");

exports.database = function(api, next){

  // modify / append the api global variable
  // I will be run as part of actionHero's boot process
  orm.connect("postgres://influence:plantlife@localhost/influence_db", function (err, db){
    if(err) { console.log('error', err); next(); }
    else if(db) {
      console.log('Connected to influence_db');
      // drop the table then re-add it from the csv on server boot
      db.driver.execQuery("DROP TABLE politician", function (err, data) {
        if (data){
          // this should be moved to a task!!!!!!!
          var Politician = db.define('politician',{
            title: String,
            firstname: String,
            middlename: String,
            lastname: String,
            name_suffix: String,
            nickname: String,
            party: String,
            state: String,
            district: String,
            in_office: String,
            gender: String,
            phone: String,
            fax: String,
            website: String,
            webform: String,
            congress_office: String,
            bioguide_id: String,
            votesmart_id: String,
            fec_id: String,
            govtrack_id: String,
            crp_id: String,
            twitter_id: String,
            congresspedia_url: String,
            youtube_url: String,
            facebook_id: String,
            official_rss: String,
            senate_class: String,
            birthdate: String
          });
          exports.Politician = Politician;
          Politician.sync(function (err) {
            db.driver.execQuery("COPY politician (title,firstname,middlename,lastname,name_suffix,nickname,party,state,district,in_office,gender,phone,fax,website,webform,congress_office,bioguide_id,votesmart_id,fec_id,govtrack_id,crp_id,twitter_id,congresspedia_url,youtube_url,facebook_id,official_rss,senate_class,birthdate) FROM '/tmp/legislators.txt' DELIMITER ',' CSV;",
              function (err, data) {
                if (data){
                  // continue to init
                  next();
                }
                else{
                  console.log('Error: ', err);
                }
            });
          });
        }
        else if(err){console.log('Error: ', err);}
      });

    }
  });
};
