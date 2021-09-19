'use strict';

require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo!')
  });
  
  mongoose.connect(process.env.MONGODB_URL);


  //Import our Mongoose model
  const Books = require('./models/bookRoute');  //Books is the model and Book is the file
  
  const app = express();

  const cors = require('cors');
  app.use(cors());
  app.use(express.json());

//Route Handlers

app.get('/bookRoute', async (req, res) => {  //books is page name
  const title = req.query.title;

  const findQuery = {};
  if (title) {
    findQuery.title = title;
  }
  const books = await Books.find(findQuery);  //Books is the model

  res.send(books); 
})

app.post('/bookRoute', postBooks);
app.delete('/bookRoute/:id', deleteBook)
app.put('/bookRoute/:id', putBook)


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

async function putBook(req, res) {
  let id = req.params.id;
  let bookUpdate = req.body;

  let options = {
    new: true, //return the updated book, not the old version
    overwrite: true, //replace the whole book, instead of "patching"
  }
  try{
    let updatedBook = await Books.findByIdAndUpdate(id, bookUpdate, options);
    res.send(updatedBook);
  }
  catch (err) {
    handleError (err, res);
  }
}

async function deleteBook(req,res) {
  let id = req.params.id;

  try {
    await Books.findByIdAndDelete(id);
    res.status(204).send();
  }
  catch(err) {
    handleError(err, res);
  }
}

function handleError (err, res) {
  console.error(err);
  res.status(500).send('Ugh!  Server error.');
}

