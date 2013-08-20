var orm = require("orm");
var _ = require("lodash");

exports.action = {
  name: "politicians",
  description: "Return basic information about all politicians.",
  inputs: {
    required: [],
    optional: ["id", "all"],
  },
  blockedConnectionTypes: [],
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){

    var id = !!parseInt(connection.params.id) ? connection.params.id : false;
    var all = connection.params.all;
    orm.connect("postgres://influence:plantlife@localhost/influence_db", function (err, db){
      if(err) { console.log('error', err); next(connection, true); }
      else if(db){
        Politician = require('../initializers/database.js').Politician;
        connection.response.results = [];

        // all reps requested
        if(all){
          Politician.find(function (err, all) {
            _.each(all, function(item){
              var temp = {};
              temp.id = item.id;
              temp.title = item.title;
              temp.firstname = item.firstname;
              temp.middlename = item.middlename;
              temp.lastname = item.lastname;
              temp.name_suffix = item.name_suffix;
              temp.nickname = item.nickname;
              temp.party = item.party;
              temp.state = item.state;
              temp.district = item.district;
              temp.in_office = item.in_office;
              temp.gender = item.gender;
              temp.phone = item.phone;
              temp.fax = item.fax;
              temp.website = item.website;
              temp.webform = item.webform;
              temp.congress_office = item.congress_office;
              temp.bioguide_id = item.bioguide_id;
              temp.votesmart_id = item.votesmart_id;
              temp.fec_id = item.fec_id;
              temp.govtrack_id = item.govtrack_id;
              temp.crp_id = item.crp_id;
              temp.twitter_id = item.twitter_id;
              temp.congresspedia_url = item.congresspedia_url;
              temp.youtube_url = item.youtube_url;
              temp.facebook_id = item.facebook_id;
              temp.official_rss = item.official_rss;
              temp.senate_class = item.senate_class;
              temp.birthdate = item.birthdate;
              connection.response.results.push(temp);
            });
            connection.response.results.shift();
            next(connection, true);
          });
        }

        // single rep requested by id
        else if(id){
          Politician.get(id, function (err, item) {
            var temp = {};
            temp.id = item.id;
            temp.title = item.title;
            temp.firstname = item.firstname;
            temp.middlename = item.middlename;
            temp.lastname = item.lastname;
            temp.name_suffix = item.name_suffix;
            temp.nickname = item.nickname;
            temp.party = item.party;
            temp.state = item.state;
            temp.district = item.district;
            temp.in_office = item.in_office;
            temp.gender = item.gender;
            temp.phone = item.phone;
            temp.fax = item.fax;
            temp.website = item.website;
            temp.webform = item.webform;
            temp.congress_office = item.congress_office;
            temp.bioguide_id = item.bioguide_id;
            temp.votesmart_id = item.votesmart_id;
            temp.fec_id = item.fec_id;
            temp.govtrack_id = item.govtrack_id;
            temp.crp_id = item.crp_id;
            temp.twitter_id = item.twitter_id;
            temp.congresspedia_url = item.congresspedia_url;
            temp.youtube_url = item.youtube_url;
            temp.facebook_id = item.facebook_id;
            temp.official_rss = item.official_rss;
            temp.senate_class = item.senate_class;
            temp.birthdate = item.birthdate;
            connection.response.results.push(temp);
            next(connection, true);
          });
        }

        // limited number of reps requested
        else{
          Politician.find(function (err, all) {
            for(var i = 1; i < connection.params.limit + 1; i++){
              var temp = {};
              temp.id = all[i].id;
              temp.title = all[i].title;
              temp.firstname = all[i].firstname;
              temp.middlename = all[i].middlename;
              temp.lastname = all[i].lastname;
              temp.name_suffix = all[i].name_suffix;
              temp.nickname = all[i].nickname;
              temp.party = all[i].party;
              temp.state = all[i].state;
              temp.district = all[i].district;
              temp.in_office = all[i].in_office;
              temp.gender = all[i].gender;
              temp.phone = all[i].phone;
              temp.fax = all[i].fax;
              temp.website = all[i].website;
              temp.webform = all[i].webform;
              temp.congress_office = all[i].congress_office;
              temp.bioguide_id = all[i].bioguide_id;
              temp.votesmart_id = all[i].votesmart_id;
              temp.fec_id = all[i].fec_id;
              temp.govtrack_id = all[i].govtrack_id;
              temp.crp_id = all[i].crp_id;
              temp.twitter_id = all[i].twitter_id;
              temp.congresspedia_url = all[i].congresspedia_url;
              temp.youtube_url = all[i].youtube_url;
              temp.facebook_id = all[i].facebook_id;
              temp.official_rss = all[i].official_rss;
              temp.senate_class = all[i].senate_class;
              temp.birthdate = all[i].birthdate;
              connection.response.results.push(temp);
            }
            next(connection, true);
          });
        }

      }
    });
  }
};
