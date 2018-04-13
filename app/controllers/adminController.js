var exports = module.exports = {}
var db = require('../models/index');
var auth = require('../controllers/authenticationController.js');
var Q = require("q");
var hasher = require('wordpress-hash-node');
var email = require('../controllers/emailController.js')

exports.UpdateUser = function(req, res) {
  var hash = hasher.HashPassword(req.body.password);
  auth.validateToken(req.headers.auth_token, req.params.email).then(function(token) {
    if (token == token) {
      db.users.findOne({
        where: {
          user_email: req.params.email
        }
      }).then(function(Admin) {
        if (Admin.access_level == 4) {
          db.users.findOne({
            where: {
              user_email: req.body.email
            }
          }).then(function(User) {
            var email = req.body.email
            if(req.body.new_email != null){
              email = req.body.new_email;
            }
              db.users.update({
                user_pass: hash,
                user_first_name: req.body.first_name,
                user_last_name: req.body.last_name,
                user_phone: req.body.phone,
                user_email: email,
                user_status: req.body.status,
                company_id: req.body.company_id,
              }, {
                where: {
                  user_email: req.body.email
                },
                returning: true
              }).then(function(result) {
                res.status(200).json({
                  'result': 'success',
                  'msg': 'Dados atualizados com sucesso'
                });
              }).catch(function(error) {
                res.status(403).json({
                  'result': 'failure',
                  'msg': 'email inexistente'
                });
              })
          })

        } else if (Admin.is_company_admin == true) {
          db.users.findOne({
            where: {
              user_email: req.body.email
            }
          }).then(function(User) {
              var email = req.body.email
            if(req.body.new_email != null){
              email = req.body.new_email;
            }
              db.users.update({
                user_pass: hash,
                user_first_name: req.body.first_name,
                user_last_name: req.body.last_name,
                user_phone: req.body.phone,
                user_email: email,
                user_status: req.body.status,
              }, {
                where: {
                  user_email: req.body.email
                },
                returning: true
              }).then(function(result) {
                res.status(200).json({
                  'result': 'success',
                  'msg': 'Dados atualizados com sucesso'
                });
              }).catch(function(error) {
                res.status(403).json({
                  'result': 'failure',
                  'msg': 'email inexistente'
                });
              })
          })
        }
      })
    } else {
      res.status(403).json({
        'result': 'failure',
        'msg': 'Token inválido'
      });
    }
  })
};



exports.CreateUser = function(req, res) {
  var hash = hasher.HashPassword(req.body.password);
  auth.validateToken(req.headers.auth_token, req.params.email).then(function(token) {
    if (token == token) {
      db.users.findOne({
        where: {
          user_email: req.params.email
        }
      }).then(function(Admin) {
        var site = req.headers.site;
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
           var msg = msg + '<p>Olá sua conta no site HELP Shop foi criada com as seguintes credencias</p>';
           var msg = msg + '<p>Login: ' + req.body.email +'</p>';
           var msg = msg + '<p>Senha: ' + req.body.password +'</p>';                  
           var msg = msg + '<p>Clique no link abaixo para acessar o site</p>';
           var msg = msg +  '<p><a href="http://helpshop.site/" target="_blank" style="color: #f47920; text-decoration: underline;">Acessar o site</a></p>'
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
           var msg = msg + 'Telefone: (11) 5555-5555<br>E-mail: <a href="mailto:contato@helpshop.site" style="color: #ffffff;';
           var msg = msg + 'text-decoration: none;">contato@helshop.site</a></p>';
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
           var msg = msg + '<p>Olá sua conta no site BMG Shop foi criada com as seguintes credenciais</p>';
           var msg = msg + '<p>Login: ' + req.body.email +'</p>';
           var msg = msg + '<p>Senha: ' + req.body.password +'</p>';                  
           var msg = msg + '<p>Clique no link abaixo para acessar o site</p>';
           var msg = msg +  '<p><a href="http://bmgshop.site/" target="_blank" style="color: #f47920; text-decoration: underline;">Acessar o site</a></p>'
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



        if (Admin.access_level == 4) {
          var dbUser = db.users.build({
            user_login: req.body.login,
            user_pass: hash,
            user_first_name: req.body.first_name,
            user_last_name: req.body.last_name,
            user_phone: req.body.phone,
            user_email: req.body.email,
            user_display_name: Admin.company_name,
            user_status: 0,
            access_level: req.body.access_level,
            company_id: req.body.company_id,
            is_company_admin:false
            

          })
         
          
          
          var query = "insert into wp_users(user_login, user_pass, user_nicename, user_email, user_url, user_activation_key, user_status, display_name, user_registered) ";
          var query = query + 'values(' +'"'+ req.body.login +'"'+ ',' +'"'+ hash +'"'+ ',' + '"' + req.body.first_name + '"' + ','+ '"'+ req.body.email + '",' + '"default", "default"' +  ',0,"default", now())';
          email.SendMail(site,msg, 'Conta criada no '+site+'shop', req.body.email );
          auth.getConnection(query);
          console.log(query);
          dbUser.save().then(function(saved) {
            res.status(201).json(saved);
          }).catch(function(error) {
            res.status(403).json({
              'result': 'failure',
              'msg': error
            });
          })

        } else if (Admin.is_company_admin == true) {
          var dbUser = db.users.build({
            user_login: req.body.login,
            user_pass: hash,
            user_first_name: req.body.first_name,
            user_last_name: req.body.last_name,
            user_phone: req.body.phone,
            user_email: req.body.email,
            user_display_name: Admin.company_name,
            user_status: 0,
            access_level: Admin.access_level,
            company_id: Admin.company_id,
            is_company_admin:false
          })
        var query = "insert into wp_users(user_login, user_pass, user_nicename, user_email, user_url, user_activation_key, user_status, display_name, user_registered) ";
          var query = query + 'values(' +'"'+ req.body.login +'"'+ ',' +'"'+ hash +'"'+ ',' + '"' + req.body.first_name + '"' + ','+ '"'+ req.body.email + '",' + '"default", "default"' +  ',0,"default", now())';
         email.SendMail(site,msg, 'Conta criada no '+site+'shop', req.body.email );

          auth.getConnection(query);
          dbUser.save().then(function(saved) {
            
            res.status(201).json(saved);
          }).catch(function(error) {
            res.status(403).json({
              'result': 'failure',
              'msg': error
            });
          })

        }
      })
      
    } else {
      res.status(403).json({
        'result': 'failure',
        'msg': 'Token inválido'
      });
    }
  })
};




exports.UpdateAdminCompany = function(req, res) {
  var company_credits;
  var cp_name;
  auth.validateToken(req.headers.auth_token, req.body.email).then(function(result) {
    if (result == true) {
      db.users.findOne({
        where: {
          user_email: req.body.email
        }
      }).then(function(user) {
        if (user.access_level != 4) {
          res.status(403).json({
            'result': 'failure',
            'msg': 'Usuário não possui acesso para atualizar'
          });
        } else {
          db.companies.findOne({
              where: {
                company_economic_group: req.body.company_economic_group
              },
            }).then(function(company) {
              if (company == null) {
                var dbCompany = db.companies.build({
                  company_economic_group: req.body.company_economic_group,
                  company_name: req.body.company_name,
                  company_cnpj: req.body.company_cnpj,
                  company_credits: 0
                })
                dbCompany.save().then(function(comp_saved) {
                  res.status(200).json({
                    'result': 'success',
                    'msg': 'Dados atualizados com sucesso'
                  })
                  return
                })
              } else {
                cp_name = company.company_name;
                company_credits = company.company_credits;
                if (req.body.transaction_type == 'credit') {
                  company_credits = Math.round(company.company_credits * 100) / 100 + Math.round(req.body.transaction_value * 100) / 100;
                } else if (req.body.transaction_type == 'purchase') {
                  company_credits = Math.round(company.company_credits * 100) / 100 - Math.round(req.body.transaction_value * 100) / 100;
                }
              }

            }).then(function(update_company) {
              db.companies.update({
                company_cnpj: req.body.company_cnpj,
                // company_economic_group:req.body.company_economic_group,
                company_credits: company_credits,
                company_name: req.body.company_name
              }, {
                where: {
                  company_economic_group: req.body.company_economic_group
                },
                returning: true,
                plain: true
              }).then(function(updateuser) {
                db.users.update({
                  display_name: cp_name
                }, {
                  where: {
                    company_id: req.body.company_economic_group
                  }
                })
              })
            })
            .then(function(result) {
              res.status(200).json({
                'result': 'success',
                'msg': 'Dados atualizados com sucesso'
              })
            }).catch(function(error) {
              res.status(403).json({
                'result': 'failure',
                'msg': 'Falha ao atualizar catched exception'
              });
            })

        }
      })
    } else {
      res.status(403).json({
        'result': 'failure',
        'msg': 'Token inválido'
      });
    }
  })
};



exports.GetUsers = function(req, res) {
  auth.validateToken(req.headers.auth_token, req.params.email).then(function(token) {
    if (token == true) {
      db.users.findOne({
        where: {
          user_email: req.params.email
        }
      }).then(function(admin) {
        if (admin.is_company_admin == true) {
          if (req.body.email != null) {
            db.users.findOne({
              where: {
                user_email: req.body.email
              }
            }).then(function(result) {
              res.status(200).json(result);
            })
          } else {
            if (req.body.company_economic_group == null) {
              if (admin.access_level == 4) {
                db.users.findAll().then(function(result) {
                  res.status(200).json(result);
                })
              } else {
                db.users.findAll({
                  where: {
                    company_id: admin.company_id
                  }
                }).then(function(result) {
                  res.status(200).json(result);
                })
              }

            } else {
              db.users.findAll({
                where: {
                  company_id: req.body.company_economic_group
                }
              }).then(function(result) {
                res.status(200).json(result);
              })
            }

          }
        } else {
          res.status(403).json({
            'result': 'failure',
            'msg': 'usuário não autorizado'
          });
        }
      }).catch(function(error) {
        res.status(403).json({
          'result': 'failure',
          'msg': 'email inexistente'
        });
      })
    } else {
      res.status(403).json({
        'result': 'failure',
        'msg': 'Token inválido'
      });
    }
  })
};
