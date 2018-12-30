var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//Setup the template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log("Listening to port 3000");