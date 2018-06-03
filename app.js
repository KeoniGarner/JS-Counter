var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.session.visits) {
        req.session.visits += 1;
    } else {
        req.session.visits = 1;
    }
    res.render('index', {visits: req.session.visits});
});

app.post('/two', function(req, res) {
    req.session.visits += 1;
    res.redirect('/');
});

app.post('/reset', function(req, res) {
    req.session.visits = 0;
    res.redirect('/');
});


app.listen(8000, function() {
    console.log("Running in localhost at port 8000");
});