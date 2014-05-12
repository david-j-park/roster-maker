var express = require('express')
, app = express();

app.set('view engine', 'jade');

app.get("/", function(req, res){
    res.render('home');
});

app.get("/partials/:tpl", function(req, res){
    res.render('partials/' + req.params.tpl);
});

app.use(express.static(__dirname + "/public"));

app.listen(8000);