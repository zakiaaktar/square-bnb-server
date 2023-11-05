const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;



// middle wares
app.use(cors());
app.use(express.json());




app.get('/api/v1/services', (req, res) => {
    res.send('it is working')
})




app.get('/', (req, res) => {
    res.send('square bnb server is running');
  });
  
  app.listen(port, () => {
    console.log(`square bnb server running on ${port}`);
  })