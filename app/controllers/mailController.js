var exports = module.exports = {};
var secrets = require('../config/secrets');
var gmailNode = require('gmail-node');
exports.sendmail = function(req, res) {

var apikey;
var gmailtoken;
if (req.body.site = 'help') {

  apikey = secrets.HelpclientSecret;
  gmailtoken = './tokenhelp.json'
}
else if (req.body.site = 'bmg') {
  apikey = secrets.BmgclientSecret;
  gmailtoken = './tokenbmg.json'
}


gmailNode.init(apikey, gmailtoken, initComplete);

function initComplete(err, dataObject) {
    if(err){
        console.log('Error ', err);
    }else {
        gmailNode.sendHTML(emailMessage, function (err, data) {
            console.log(err,data);
            res.status(201).json(data)  });
    }
}
}


var emailMessage = {
    to: 'fernandes.cauep@gmail.com',
    subject: 'Test Subject',
  message: '<h1>Test Email</h1>'
};
