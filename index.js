const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;



// middle wares
app.use(cors());
app.use(express.json());

//console.log(process.env.DB_PASS)


const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwlx9fx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    app.get('/api/v1/services', (req, res) => {
        res.send('it is working')
    });











    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('square bnb server is running');
  });
  
  app.listen(port, () => {
    console.log(`square bnb server running on ${port}`);
  })