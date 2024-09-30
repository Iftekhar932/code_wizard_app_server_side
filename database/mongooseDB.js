const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.mongoUSR}:${process.env.mongoPWD}@cluster0.hgty8ov.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

const connectDB = () => {
  try {
    mongoose.connect(uri);
  } catch (error) {
    console.error("🚀 ~ connectDB ~ error mongooseDB line 11:", error);
  }
};

module.exports = connectDB;
