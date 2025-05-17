import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDb connected");
  } catch (error) {
    console.log(error.message || error);
    process.exit(1);
  }
};

export default connectDB;
