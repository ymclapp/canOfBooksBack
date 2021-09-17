'use strict';

require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to mongo!')
  });
  
  mongoose.connect(process.env.MONGODB_URL);


  //Import our Mongoose model
  const Books = require('./models/bookRoute');  //Books is the model and Book is the file
  
  const app = express();

  const cors = require('cors');
  app.use(cors());

//Route Handlers

app.get('/bookRoute', async (req, res) => {  //books is page name
  const title = req.query.title;

  const findQuery = {};
  if (title) {
    findQuery.title = title;
  }
  const allBooks = await Books.find(findQuery);  //Books is the model

  res.send(allBooks); 
})

app.post('/bookRoute', postBooks);


//Start server
const PORT = process.env.PORT;
if(!parseInt(PORT)) throw 'Invalid PORT';

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

//adding a book
async function postBooks(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);

  try {
    const newBook = await Books.create(req.body);
    res.send(newBook);
  }
  catch (err) {
    handleError(err, res);
  }
}
