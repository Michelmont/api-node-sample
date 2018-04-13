var exports = module.exports = {}
var db = require('../models/index');
var auth = require('../controllers/authenticationController.js');
var Q = require("q");
var hasher = require('wordpress-hash-node');
var gmailNode = require('gmail-node');



exports.SendMail = function(site, msg, subject, dest){

console.log(site);
console.log(msg);
console.log(subject);
console.log(dest);

    var helpSecret = {
    installed: {
        client_id: "1033198550273-o8u03kmn26se1us8e859it7a2r4megpo.apps.googleusercontent.com",
        project_id: "helpshopsmtp",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "XcVi3fzf4Rdxrs6vUVN_VyOL",
        redirect_uris:["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
    }
    };
console.log(helpSecret);
    var bmgSecret = {
    installed: {
        client_id: "918892283875-afg1a46kaiu43r0hvtnuk09h4cethcok.apps.googleusercontent.com",
        project_id: "bmgshop-188004",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "n2cegjSDNw3fauYyBz3-14MJ",
        redirect_uris:["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
    }
    };

    var testMessage = {
    to: dest,
    subject: subject,
    message: msg
    };

// ClientSecret:
if (site =='help')
{
    gmailNode.init(helpSecret, './tokenhelp.json', initCompleteHELP);
}
else if(site =='bmg'){
console.log('site bmg');
    gmailNode.init(bmgSecret, './tokenbmg.json', initCompleteBMG);
}

function initCompleteBMG(err, dataObject) {
    if(err){
        console.log('Error ', err);
        //res.status(403).json({'msg': 'Erro no envio do email'});
    }else {

        // OR

        gmailNode.sendHTML(testMessage, function (err, data) {
            //res.status(200).json({'msg': 'email enviado com sucesso'});
            console.log('enviado com sucesso');
        });
    }
}

function initCompleteHELP(err, dataObject) {
    if(err){
        console.log('Error ', err);
            //res.status(403).json({'msg': 'Erro no envio do email'});
    }else {

        // OR

        gmailNode.sendHTML(testMessage, function (err, data) {
          //  res.status(200).json({'msg': 'email enviado com sucesso'});
        console.log('enviado com sucesso');
        });
    }
}

// create reusable transport method (opens pool of SMTP connections)

}
