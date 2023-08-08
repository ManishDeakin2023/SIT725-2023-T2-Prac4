var express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
let app = express();
const uri = "mongodb+srv://admin:admin@cluster0.ulnywla.mongodb.net/?retryWrites=true&w=majority";
let collection;
let port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//this function connects nodejs server

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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
  

app.get('/', function (req, res) {
  res.render("index.html");
})





app.post('/api/cat', function (req, res) {
  let cat = req.body;
  insertCat(cat, (err, result) => {
    if (!err) {
      res.json({ statusCode: 201, data: result, message: 'success' });
    }
  });
});

function insertCat(cat, callback) {
  collection.insertOne(cat, callback);
}

app.get('/api/cats', (req, res) => {
  getAllCats((err, result) => {
    if (!err) {
      res.json({ statusCode: 200, data: result, message: 'success' });
    }
  });
});

function getAllCats(callback) {
  collection.find({}).toArray(callback);
}


app.listen(port, () =>
{
    console.log("server started on port ",port);
    run();
})


