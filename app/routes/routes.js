var express = require('express');
var router = express.Router();
var authController = require('../controllers/authenticationController.js');
var userController = require('../controllers/userController.js');
var adminController = require('../controllers/adminController.js');
var emailController = require('../controllers/emailController.js');
var addressController = require('../controllers/addressController.js');



module.exports = function(app) {
//Auth Routes


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.post('/API/login', authController.login);
  app.post('/API/validate', authController.validateToken);
  app.post('/API/Generator', authController.CreatePwd);
  app.get('/API/Connection', authController.getConnection);

//User Routes
  app.get('/api/users/:email', userController.GetUserByCompany);
  app.get('/api/users/email/:email', userController.GetUserByEmail);
  app.post('/api/users/email/', userController.UpdateUserByEmail);
  app.get('/api/users/company/:email', userController.GetUserCompanybyEmail);
  app.post('/api/users/password/email', userController.SendMailToResetPassword);
  app.post('/api/users/password/reset', userController.ResetPassword);

  //Addresses Routes
    app.post('/api/address', addressController.GetAddress);
    app.get('/api/address/:id', addressController.GetOneAddress);
    app.get('/api/address/:email/:token/:company', addressController.GetAddressJSON);
    app.post('/api/address/update', addressController.UpdateAddress);
    app.post('/api/address/setDefault', addressController.UpdateAddress);
    app.post('/api/address/create', addressController.CreateAddress);


//Admin Routes
app.post('/api/admin/users/:email', adminController.CreateUser);
app.put('/api/admin/users/:email', adminController.UpdateUser);
app.post('/api/admin/users/find/:email', adminController.GetUsers);
app.post('/api/admin/company/', adminController.UpdateAdminCompany);
}
