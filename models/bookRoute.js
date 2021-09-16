// import mongoose from 'mongoose';
const mongoose = require('mongoose');
require('dotenv').config();


const { Schema } = mongoose;

const bookSchema = new Schema({
    title:  String,
    description: String,
    status: String,
    email: String,
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
