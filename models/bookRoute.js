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

const Model = mongoose.model('Books', bookSchema);

module.exports = Model;
