var express = require("express");
var fortune = require('./lib/fortune.js's);
var app = express();

var handlebars = require("express-handlebars");
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', {fortune: fortune.getFortune()});
});

app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), process.env.IP, function(){
    console.log('Express has started on http://localhost:'+app.get('port')+': Ctrl-C to exit');
});