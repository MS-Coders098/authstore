const mongoose = require("mongoose");

const connectToMongo = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/AuthStore")
    .then(() => {
        console.log("Connected To MongoDB")
    }).catch(err => console.log(`Error White Connecting ${err}`))
}

module.exports = connectToMongo