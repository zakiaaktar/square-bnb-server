const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;



// parsers
app.use(express.json());
app.use(cors());



//console.log(process.env.DB_PASS)


//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwlx9fx.mongodb.net/?retryWrites=true&w=majority`;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwlx9fx.mongodb.net/squareBnb?retryWrites=true&w=majority`;

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


        const serviceCollection = client.db('squareBnb').collection('services');
        const bookingCollection = client.db('squareBnb').collection('bookings');



        app.get('/api/v1/services', async (req, res) => {
            const cursor = serviceCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });


        app.post('/api/v1/user/create-booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking)
            res.send(result)
        });


        app.delete('/api/v1/user/cancel-booking/:bookingId', async (req, res) => {
            console.log(req.params);
            const id = req.params.bookingId
            const query = { _id: new ObjectId(id) }
            const result = await bookingCollection.deleteOne(query)
            res.send(result)
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