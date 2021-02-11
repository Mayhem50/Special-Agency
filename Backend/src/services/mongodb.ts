import mongoose from "mongoose";
import config from "./config";

const uri = `mongodb+srv://${config.MONGODB.user}:${config.MONGODB.password}@cluster0.t5yrg.mongodb.net/${config.MONGODB.db}?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(`MongoDB fails to connect: `, error);
    process.exit(-5);
  }
})();
