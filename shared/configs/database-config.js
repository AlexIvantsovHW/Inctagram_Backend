import mongoose from 'mongoose';
import { dbURL } from './configs.js';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB is connected");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

export default connectDB;
