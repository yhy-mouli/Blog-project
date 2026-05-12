const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb ^_^");
    } catch (error) {
        console.log("Connection failed to mongoDb", error);
    }
}