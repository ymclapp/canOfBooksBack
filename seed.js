const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Books = require('./models/Book');

async function seed() {
    const myBook = new Books(
        {
        title:  "Where the Red Fern Grows",
        description: "A sad book",
        status: "Out",
        email: "ymclapp@yahoo.com",
        },
        {
        title:  "Discovery of Witches",
        description: "A witch book",
        status: "In",
        email: "ymclapp@yahoo.com",
        },
        {
        title:  "Neon Prey",
        description: "A Lucas Davenport book",
        status: "In",
        email: "ymclapp@yahoo.com",
        })
    await myBook.save();
}

seed();