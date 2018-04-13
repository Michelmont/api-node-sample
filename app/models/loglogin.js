'use strict';
module.exports = (sequelize, DataTypes) => {
  var LogLogin = sequelize.define('loglogin', {
    login: DataTypes.STRING,
    site: DataTypes.STRING,
    is_company_admin: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LogLogin;
};
