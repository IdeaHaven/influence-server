Title
=====

API
===
`//influence.ideahaven.co/`

Politicians
------------------
`/api/politician`

* required parameters: none
* optional parameters:
 * `id=<number>` will return an individual politician by id
 * `limit=<number, default:100>` will return the first 100 (or limit specified) by alphabetical order
 * `all=<bool>` will return all politicians in our database
* results:
 * id
 * title
 * firstname
 * middlename
 * lastname
 * name_suffix
 * nickname
 * party
 * state
 * district
 * in_office
 * gender
 * phone
 * fax
 * website
 * webform
 * congress_office
 * bioguide_id
 * votesmart_id
 * fec_id
 * govtrack_id
 * crp_id
 * twitter_id
 * congresspedia_url
 * youtube_url
 * facebook_id
 * official_rss
 * senate_class
 * birthdate