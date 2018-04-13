var mysql = require("mysql");

var pool = mysql.createPool({
        connectionLimit : 100,
        host     : '52.67.83.45',
        port     :  3306,
        user     : 'APIUSER',
        password : '#Gaveta01',
        database : 'help',
    });


exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    console.log(err,conn);
    callback(err, conn);
  });
};

var pool2 = mysql.createPool({
        connectionLimit : 100,
        host     : '54.94.142.15',
        port     :  3306,
        user     : 'APIUSER',
        password : '#Gaveta01',
        database : 'help',
    });


exports.getConnection2 = function(callback) {
  pool2.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};