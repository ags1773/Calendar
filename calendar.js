var express             = require("express"),
    app                 = express()

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('calendar');
});

app.listen(3001);
