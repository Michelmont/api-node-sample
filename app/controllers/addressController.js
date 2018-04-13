var exports = module.exports = {}
var db = require('../models/index');
var auth = require('../controllers/authenticationController.js');
var Q = require("q");
var email = require('../controllers/emailController.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var secrets = require('../config/secrets');


exports.GetAddress = function(req, res) {
  auth.validateToken(req.headers.auth_token,req.body.email).then(function(token){
    if (token == true){
 db.addresses.findAll({
   where: {
       $or: [{
         user_email: req.body.email
       }, {
         company_economic_group: req.body.company_economic_group
       }]
   }
}).then(function(result) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(result);
      }).catch(function (error) {
        
        res.status(403).json({'result':'failure','msg':'email inexistente'});
    })
  }
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};

exports.GetAddressJSON = function(req, res) {
  auth.validateToken(req.params.token,req.params.email).then(function(token){
    if (token == true){
 db.addresses.findAll({
   where: {
       $or: [{
         user_email: req.params.email
       }, {
         company_economic_group: req.params.company_economic_group
       }]
   }
}).then(function(result) {
  res.status(200).json(result);
      }).catch(function (error) {
        
        res.status(403).json({'result':'failure','msg':'email inexistente'});
    })
  }
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};


exports.GetOneAddress = function(req, res) {
  auth.validateToken(req.headers.auth_token,req.headers.auth_email).then(function(token){
    if (token == true){
 db.addresses.findAll({
   where: {
       
         id: req.params.id
      
   }
}).then(function(result) {
  console.log(result);
  res.status(200).json(result);
      }).catch(function (error) {
          console.log(result);

        res.status(403).json({'result':'failure','msg':'id inexistente'});
    })
  }
    else{
        console.log(result);

    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};


exports.UpdateAddress = function(req, res) {
auth.validateToken(req.headers.auth_token,req.body.email).then(function(token){
console.log(req.body);
if (token == true){
 db.addresses.update({
   address_first_name:req.body.first_name,
   address_last_name:req.body.last_name,
   address_address:req.body.address,
   address_address2:req.body.address2,
   address_address3:req.body.address3,
   address_address4:req.body.address4,
   address_empresa:req.body.empresa,
    address_email:req.body.address_email,
    address_phone:req.body.address_phone,
   address_city:req.body.city,
   address_state:req.body.state,
   address_postal_code:req.body.postal_code,
   address_type:req.body.type,
   address_title:req.body.title
 }, {
   where: { id: req.body.address_id },
   returning: true
 }).then(function(result) {
    res.status(200).json({'result':'success','msg':'Dados atualizados com sucesso'});
      }).catch(function (error) {
        res.status(403).json({'result':'failure','msg':'Não foi possível atualizar nesse momento'});
    })
  } 
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};


exports.UpdateAddressDefault = function(req, res) {
auth.validateToken(req.headers.auth_token,req.body.email).then(function(token){
console.log(req.body);
if (token == true){
 db.addresses.update({
   
   adress_billing: req.body.billing,
   address_title:req.body.shipping
 }, {
   
   returning: true
 }).then(function(result) {
      db.addresses.update({
   
   adress_billing: 0,
   address_title:0
 }, {
   where:{id: {not:req.body.id}},
   returning: true
 }).then(function(result) {
    res.status(200).json({'result':'success','msg':'Dados atualizados com sucesso'});
    
      }).catch(function (error) {
        res.status(403).json({'result':'failure','msg':'Não foi possível atualizar nesse momento'});
    })

      }).catch(function (error) {
        res.status(403).json({'result':'failure','msg':'Não foi possível atualizar nesse momento'});
    })
  } 
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};



exports.CreateAddress = function(req, res) {
auth.validateToken(req.headers.auth_token,req.body.email).then(function(token){
if (token == true){
  var dbAddress = db.addresses.build({
    address_title:req.body.title,
    address_first_name:req.body.first_name,
    address_last_name:req.body.last_name,
    address_address:req.body.address,
    address_address2:req.body.address2,
    address_address3:req.body.address3,
    address_address4:req.body.address4,
    address_empresa:req.body.company,
    address_email:req.body.address_email,
    address_phone:req.body.address_phone,
    address_city:req.body.city,
    address_state:req.body.state,
    address_postal_code:req.body.postal_code,
    address_type:req.body.type,
    user_email:req.body.email,
    company_economic_group:req.body.company_economic_group
  })
  dbAddress.save().then(function(result) {
    res.status(200).json({'result':'success','msg':'Dados atualizados com sucesso'});
      }).catch(function (error) {
        console.log(error);
        res.status(403).json({'result':'failure','msg':'Não foi possível atualizar nesse momento'});
    })
  }
    else{
    console.log('erro token inválido')
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};



