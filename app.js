var express = require('express');
var app = express();
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('cheese.db');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.use(urlencodedBodyParser);

app.use(methodOverride('_method'));

app.set('view_engine', 'ejs');

app.get('/', function(req,res){
  console.log("asldkfja")
}
"helloooo dis a test"
app.listen(3000, function(){
    console.log('listening on port 3000!')
});
