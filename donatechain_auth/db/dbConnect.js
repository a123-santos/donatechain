const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");


async function connectToMongoDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_DATABASE_URL);

    console.log("Connected to MongoDB Atlas", db.connection.host);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToMongoDB;
