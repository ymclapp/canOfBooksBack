'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo!')
  });

mongoose.connect(process.env.MONGODB_URL);

const Books = require('./models/Book');  //Books is the model and Book is the file



const app = express();

app.use(cors());

//Route Handlers

// app.get('/test', (request, response) => {
//   response.send('test request received')
// })

app.get('/books', async (req, res) => {  //books is page name
  const title = req.query.title;

  const findQuery = {};
  if (title) {
    findQuery.title = title;
  }
  const books = await Books.find(findQuery);  //Books is the model

  res.send(books); //page name
})

const PORT = process.env.PORT;
if(!parseInt(PORT)) throw 'Invalid PORT';

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

