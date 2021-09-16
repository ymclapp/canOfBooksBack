const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Books = require('./models/bookRoute');  //constructor

async function seed() {
    //Deleting all of my books and starting over
    console.log('Deleting existing books')
    await Books.deleteMany({});

    const myBook1 = new Books({
        title:  "Where the Red Fern Grows",
        description: "A sad book",
        status: "Out",
        email: "ymclapp@yahoo.com",
        });
        await  myBook1.save();


    const myBook2 = new Books({
        title:  "Discovery of Witches",
        description: "A witch book",
        status: "In",
        email: "ymclapp@yahoo.com",
        });
        await  myBook2.save();
        
    const myBook3 = new Books({
        title:  "Neon Prey",
        description: "A Lucas Davenport book",
        status: "In",
        email: "ymclapp@yahoo.com",
        });
        await myBook3.save();

    mongoose.disconnect();
}

seed();