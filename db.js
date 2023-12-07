const mongoose =require("mongoose");

require("dotenv").config();
// const connection = mongoose.connect(process.env.mongoUrl);

const connection = mongoose.connect("mongodb+srv://jahir:pendhari@cluster0.jwmvgur.mongodb.net/testBackend?retryWrites=true&w=majority")

module.exports={connection}



