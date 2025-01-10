const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(
          'mongodb+srv://deepakshy94:CWCW2H25WAJ0rbPy@cluster01.xmdwo.mongodb.net/excellence?retryWrites=true&w=majority&appName=cluster01'
    );
};

module.exports = connectDB;