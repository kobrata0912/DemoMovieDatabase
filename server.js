require('dotenv').config();

const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://process.env.USERNAME:process.env.PASSWORD@expressexamcluster.x8jgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Backend connected to React' });
});