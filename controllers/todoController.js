var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

//var data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Kick some Coding Ass'}];

//Connect to the database
mongoose.connect('mongodb://test:1234qwer@ds233763.mlab.com:33763/todo_app')

//Create a schema => this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);

//Create dummy data for the DataBase
/*var itemOne = Todo({item: 'Buy Flowers'}).save(function(err){
    if(err) throw err;
    console.log('Item saved to database!');
})*/

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        //Get the data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });
    
    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
        })
    });
}
