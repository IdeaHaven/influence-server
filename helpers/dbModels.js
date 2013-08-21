var Politician;
exports.create = function(api, next, db){
  exports.Politician = db.define('politician',{
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
  next();
};
