var exports = module.exports = {}
var db = require('../models/index');
var hasher = require('wordpress-hash-node');
var secrets = require('../config/secrets');
var jwt = require('jwt-simple');
var moment = require('moment');
var Q = require("q");

exports.loglogin = function(user, site) {

  var dbLog = db.loglogin.build({
    login: user.user_email,
    site:site ,
    is_company_admin: user.is_company_admin,
  })
  dbLog.save().then(function(saved) {
  return true;
  })


}
