var express = require('express');
var app = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

//Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});

// Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.listen(5000, function(err) {

    if (!err)
        console.log("API está no ar");
    else console.log(err)

});


//Models
var models = require("./app/models");

//Routes
var routes = require('./app/routes/routes.js')(app);

//Passport strategies
//require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Tudo certo com o banco de dados')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});
