import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    title:  String,
    description: String,
    status: String,
    email: String,
});

const Model = mongoose.model('Books', bookSchema);

module.exports = Books;
