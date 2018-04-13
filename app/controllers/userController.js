var exports = module.exports = {}
var db = require('../models/index');
var auth = require('../controllers/authenticationController.js');
var Q = require("q");
var hasher = require('wordpress-hash-node');
var email = require('../controllers/emailController.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var secrets = require('../config/secrets');


exports.GetUserByEmail = function(req, res) {
  auth.validateToken(req.headers.auth_token,req.params.email).then(function(token){
if (token == true){
 db.users.findOne({
   where: {
     user_email: req.params.email}
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



exports.GetUserByCompany = function(req, res) {
  auth.validateToken(req.headers.auth_token,req.params.email).then(function(token){
if (token == true){
 db.users.findOne({
   where: {
     user_email: req.params.email}
   }).then(function(user) {
     db.users.findAll({
       where: {
         company_id: user.company_id}
  }).then(function(result){
  res.status(200).json(result);

  }).catch(function (error) {
        res.status(403).json({'result':'failure','msg':'email inexistente'});
    })
  })
  }
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })

};


exports.UpdateUserByEmail = function(req, res) {
  var hash = hasher.HashPassword(req.body.password);
  auth.validateToken(req.headers.auth_token,req.body.email).then(function(token){
if (token == true){
 db.users.update({
   user_pass:hash,
   user_first_name:req.body.user_first_name,
   user_last_name:req.body.user_last_name,
   user_phone:req.body.user_phone,
   user_email:req.body.email,
   user_status:req.body.status,
   company_id:req.body.company_id,
 }, {
   where: { user_email: req.body.email },
   returning: true
 }).then(function(result) {
    res.status(200).json({'result':'success','msg':'Dados atualizados com sucesso'});
      }).catch(function (error) {
        res.status(403).json({'result':'failure','msg':'email inexistente'});
    })
  }
    else{
    res.status(403).json({'result':'failure','msg':'Token inválido'});
    }
  })
};


exports.GetUserCompanybyEmail = function(req, res) {
  auth.validateToken(req.headers.auth_token,req.headers.auth_email).then(function(result){
//    console.log("\x1b[35m","Token result: " + result)
if (result == true){
  db.users.findOne({
    where: {
      user_email: req.params.email}
    }).then(function(user) {
       db.companies.findAll({
         where: {
           company_economic_group: user.company_id}})
    .then(function(result) {

     res.status(200).json(result);
       })
     }).catch(function (error) {
       res.status(403).json({'result':'failure','msg':'email inexistente'});
  })
}
else{
res.status(403).json({'result':'failure','msg':'Token inválido'});
}
})
 };


exports.SendMailToResetPassword = function(req, res)
{
  var email_user = req.body.email;
  var site = req.body.site;
  db.users.findOne({
    where: {$or:[{ user_email: email_user },{user_login: email_user }]},
  }).then(function(User) {
       if(User !=null){
         var user_token =
         jwt.encode(
          {
            email: User.user_email,
            exp:moment().add(3,"hours").valueOf()
          }, secrets.resetSecret
         );
         if(site == 'help')
         {
           var msg = '<head>';
           var msg =  msg + '<title>';
           var msg = msg + 'HELP Shop';
           var msg = msg +'</title>';
           var msg =  msg + '</head>';
           var msg = msg+ '<body style="background-color: #dddddd">'
           var msg = msg +'<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color: #ffffff; color: #777777; font-family: Myriad Pro, Helvetica, Arial, sans-serif">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td><a href="http://www.helpshop.site" target="_blank"><img src="http://52.67.83.45/wp-content/uploads/2017/11/help_01.jpg" width="600" height="80" alt="BMG Shop" border="0" style="display: block" /></a></td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td>';
           var msg = msg + '<table width="600" height="200" border="0" cellspacing="0" cellpadding="0">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '<td style="vertical-align: top">';
           var msg = msg + '<p>Você solicitou a redefinição de sennha no site HELP Shop</p>';
           var msg = msg + '<p>Clique no link abaixo para redefinir a senha</p>';
           var msg = msg +  '<p><a href="http://helpshop.site/my-account/lost-password?keytoken=' + user_token + '" target="_blank" style="color: #f47920; text-decoration: underline;">Redefinir senha</a></p>'
           var msg = msg + '</td>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="25" style="background-color: #f47920;">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td style="background-color: #f47920;">';
           var msg = msg + '<table width="600" border="0" cellspacing="0" cellpadding="0" style="color: #ffffff; font-size: 13px">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '<td>';
           var msg = msg + '<p style="font-size: 14px; margin-bottom: 0; font-weight: bold;">Em caso de dúvidas entre em contato.</p>';
           var msg = msg + '<p style="margin-top: 5px;">De segunda a sexta-feira das 9h as 18h.<br>';
           var msg = msg + 'Telefone: (11) 5555-5555<br>E-mail: <a href="mailto:conto@helpshop.site" style="color: #ffffff;';
           var msg = msg + 'text-decoration: none;">contato@helpshop.site</a></p>';
           var msg = msg + '</td>';
           var msg = msg + '<td style="text-align: right"><img src="http://52.67.83.45/wp-content/uploads/2017/11/logo_footer.png" width="170" height="80" alt="BMG Shop"/></td>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="25" style="background-color: #f47920;">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td style="background-color: #eeeeee; color: #777777; text-align: center; font-size: 12px; line-height: 40px;"';
           var msg = msg + '>Esta é uma mensagem gerada automaticamente. Para entrar em contato utilize os canais acima.</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</body>';


           //var msg = msg + '<a href="http://localhost/help/my-account/lost-password?keytoken=' + user_token + '">Redefinir</a>';
         }
         else if(site =='bmg')
         {
           var msg = '<head>';
           var msg =  msg + '<title>';
           var msg = msg + 'BMG Shop';
           var msg = msg +'</title>';
           var msg =  msg + '</head>';
           var msg = msg + '<body style="background-color: #dddddd">'
           var msg = msg +'<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color: #ffffff; color: #777777; font-family: Myriad Pro, Helvetica, Arial, sans-serif">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td><a href="http://www.bmgpshop.site" target="_blank"><img src="http://52.67.83.45/wp-content/uploads/2017/11/bmg_01.jpg" width="600" height="80" alt="BMG Shop" border="0" style="display: block" /></a></td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td>';
           var msg = msg + '<table width="600" height="200" border="0" cellspacing="0" cellpadding="0">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '<td style="vertical-align: top">';
           var msg = msg + '<p>Você solicitou a redefinição de sennha no site HELP Shop</p>';
           var msg = msg + '<p>Clique no link abaixo para redefinir a senha</p>';
           var msg = msg +  '<p><a href="http://bmgshop.site/my-account/lost-password?keytoken=' + user_token + '" target="_blank" style="color: #f47920; text-decoration: underline;">Redefinir senha</a></p>'
           var msg = msg + '</td>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="25" style="background-color: #f47920;">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td style="background-color: #f47920;">';
           var msg = msg + '<table width="600" border="0" cellspacing="0" cellpadding="0" style="color: #ffffff; font-size: 13px">';
           var msg = msg + '<tbody>';
           var msg = msg + '<tr>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '<td>';
           var msg = msg + '<p style="font-size: 14px; margin-bottom: 0; font-weight: bold;">Em caso de dúvidas entre em contato.</p>';
           var msg = msg + '<p style="margin-top: 5px;">De segunda a sexta-feira das 9h as 18h.<br>';
           var msg = msg + 'Telefone: (11) 5555-5555<br>E-mail: <a href="mailto:contato@bmgshop.site" style="color: #ffffff;';
           var msg = msg + 'text-decoration: none;">contato@bmgshop.site</a></p>';
           var msg = msg + '</td>';
           var msg = msg + '<td style="text-align: right"><img src="https://bmgshop.site/wp-content/themes/loja/assets/image/logo_footer.png" width="170" height="80" alt="BMG Shop"/></td>';
           var msg = msg + '<td width="50">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td height="25" style="background-color: #f47920;">&nbsp;</td>';
           var msg = msg + '</tr>';
           var msg = msg + '<tr>';
           var msg = msg + '<td style="background-color: #eeeeee; color: #777777; text-align: center; font-size: 12px; line-height: 40px;"';
           var msg = msg + '>Esta é uma mensagem gerada automaticamente. Para entrar em contato utilize os canais acima.</td>';
           var msg = msg + '</tr>';
           var msg = msg + '</tbody>';
           var msg = msg + '</table>';
           var msg = msg + '</body>';
         }

         email.SendMail(site,msg, 'Redefina sua senha no '+site+'shop', User.user_email );
         res.status(403).json({'msg': 'Email enviado' });

       }
       else
       {
          res.status(403).json({'msg': 'Usuário não encontrado' });
       }
  }).catch(function(error){

  })

}



exports.ResetPassword = function(req, res)
{
  console.log('entrou na função');
  var hash = hasher.HashPassword(req.body.password);
  var token = req.headers.auth_token;
  auth.validateTokenPassword(token).then(
    function(result){
      if(result==true){
        var decoded = jwt.decode(token,secrets.resetSecret);
        db.users.update({
          user_pass:hash
        }, {
            where: { user_email: decoded.email },
            returning: true
        }).then(function(result){
          res.status(200).json({'msg': 'Senha atualizada com sucesso'})
          console.log('Senha atualizada com sucesso');
        }).catch(function(error){
            res.status(403).json({'msg':'erro na rquisicão'});
            console.log('erro na requisição');
        });
      }
      else
      {
        res.status(403).json({'msg':'requisição inválida'});
        console.log('requisicao');
      }
    }
  );
}
