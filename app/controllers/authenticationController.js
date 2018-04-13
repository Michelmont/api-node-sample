var exports = module.exports = {}
var db = require('../models/index');
var hasher = require('wordpress-hash-node');
var secrets = require('../config/secrets');
var jwt = require('jwt-simple');
var moment = require('moment');
var Q = require("q");
var logController = require('../controllers/logController.js');
var conn = require('../config/ConnectionString');
var mysql      = require('mysql');


exports.login = function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('********************   IP DE LOGIN  ***************');
  console.log(ip);
  var site = req.body.site;
  var cod_site;
  if (site == 'help') {
    cod_site = 1
  } else if (site == 'bmg') {
    cod_site = 2
  }
  console.log('********************   PARAMETRO DE LOGIN  ***************');
  console.log(req.body.login);
  db.users.findOne({
    where: {
      
        $or: [{
          user_email: req.body.login
        }, {
          user_login: req.body.login
        }]
      
    }
  }).then(function(User) {
    //Se não achar por email, busca pelo login
    if (User == null) {
      console.log('********************   NAO ENCONTROU O USUÁRIO ***************');
      res.status(403).json({
        'result': 'failure',
        'msg': 'Usuário ou senha incorretos'
      });
    } else {
      console.log('********************   USUARIO         ***************');
      //Verifica se o usuário está aprovado
      if (User.user_status != 0 || (User.access_level < 3 && User.access_level != cod_site)) {
        console.log('********************  Usuário ainda não foi aprovado ou não tem acesso a esse  site         **********');
        res.status(403).json({
          'result': 'failure',
          'msg': 'Usuário ainda não foi apr ovado ou não tem acesso a esse site'
        });
      } else {
        //Verifica se a senha está correta entrando via Login
        var password = req.body.password;
        var checked = hasher.CheckPassword(password, User.user_pass);
        if (checked == true && User.user_status == 0) {
          //Retorna o token em caso de sucesso
          var token = jwt.encode({
            id: User.id,
            email: User.user_email,
            exp: moment().add(3, "hours").valueOf()
          }, secrets.sessionSecret);
          console.log('********************    LOGOU COM SUCESSO   *********');
          logController.loglogin(User, site);
          res.status(201).json({
            'result': 'success',
            'msg': token,
            'user': User
          });

        }
        //Falha caso a senha esteja incorreta
        else {
          console.log('********************   Senha incorreta    *********');
          res.status(403).json({
            'result': 'failure',
            'msg': 'Usuário / senha incorretos ou usário não aprovado'
          });
        }
      }
    }
  })
};



exports.CreatePwd = function(req, res) {

//  var hash = hasher.HashPassword(req.body.password);
//  res.status(403).json({
//    'Password': req.body.password,
//    'Hash': hash
//  });


};


exports.validateToken = function(token, email) {
  var deferred = Q.defer();
  db.users.findOne({
    where: {
      user_email: email
    }
  }).then(function(User) {
    var decoded = jwt.decode(token, secrets.sessionSecret)
    if (decoded.exp <= Date.now() || decoded.id != User.id || decoded.email != User.user_email) {
      deferred.resolve(false);
      //res.status(403).json({'result':'failure','msg':'Token Inválido'});
    } else {
      deferred.resolve(true);
      //res.status(200).json({'result':'success','msg':'Token Validado'});
    }
  }).catch(function(error) {
    deferred.resolve(false);
    //res.status(403).json({'result':'failure','msg':'Token Inválido'});
  })
  return deferred.promise;

};

exports.validateTokenPassword = function(token) {
  var deferred = Q.defer();

  var decoded = jwt.decode(token, secrets.resetSecret)
  if (decoded.exp <= Date.now()) {
    deferred.resolve(false);
    //res.status(403).json({'result':'failure','msg':'Token Inválido'});
  } else {
    deferred.resolve(true);
    //res.status(200).json({'result':'success','msg':'Token Validado'});
  }

  return deferred.promise;

};



exports.getConnection = function(query) {
        conn.getConnection(
            function (err, client) {

                client.query(query, function(err, rows) {
                    // And done with the connection.
                    if(err){
                        console.log(err);
                    }

                    console.log(rows);
                    client.release();

                    // Don't use the connection here, it has been returned to the pool.
                });

        });

        conn.getConnection2(
            function (err, client) {

                client.query(query, function(err, rows) {
                    // And done with the connection.
                    if(err){
                        console.log('Query Error');
                    }

                    console.log(rows);
                    client.release();

                    // Don't use the connection here, it has been returned to the pool.
                });

        });

};
