var express = require("express");
var fortune = require('./lib/fortune.js');
var app = express();

var handlebars = require("express-handlebars");
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', 
    {fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/headers', function(req, res){
   res.set('Conten-Type', 'text/plain');
   var s = '';
   for (var name in req.headers) s += name + ': ' + req.headers[name] + '<br/>';
   res.send(s);
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res) {
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});


// //Just a test
// app.post('process-contact', function(req, res){
//   console.log('Received contact form ' + req.body.name + ' < ' + req.body.email + ' > ');
//   try{
//       return res.xhr ?
//                 res.json({success:true});
//                 res.redirect(303, '/thank-you');
//   }
//   catch(ex){
//       return res.xhr ?
//                 res.json({error 'Databse-error.'});
//                 res.redirect(303, '/database-error');
//   }
// });

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