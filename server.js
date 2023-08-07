var express = require("express");
var mongoose = require("mongoose");
var app = express();
const uri = "mongodb+srv://admin:admin@cluster0.ulnywla.mongodb.net/?retryWrites=true&w=majority"
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//this function connects nodejs server
app.listen(8000, () =>
{
    console.log("server started on port 8000");
})

//this function connects mongoDB server
async function connect()
{
    try {
        await mongoose.connect(uri)
        console.log("connected to MongoDB");
    } catch (err)
    {
        console.error(err);
    }
}
connect();

app.get("/", function (req, res) {
    res.render("index.html");
})

async function run()
{
    try { 
        collection = mongoose.db().collection('Cats');
        console.log("done creating collections");
    } catch (ex)
    {
        console.error(ex);
    }
     
}