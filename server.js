var express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express();
const uri = "mongodb+srv://admin:admin@cluster0.ulnywla.mongodb.net/?retryWrites=true&w=majority";
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//this function connects nodejs server


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
  

//this function connects mongoDB server

async function run() {
    try {
      await client.connect();
      collection = client.db().collection('Cats');
        console.log("collection has been created");
        client.close();
    } catch(ex) {
      console.error(ex);
    }
}


app.listen(8000, () =>
{
    console.log("server started on port 8000");
    run();
})
app.get("/", function (req, res) {
    res.render("index.html");
})

