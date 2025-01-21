import mongoose from "mongoose";

const connectDB = async () => {  
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log(`MonogoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGO_DB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
