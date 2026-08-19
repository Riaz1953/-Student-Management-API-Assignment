import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    );
    console.log(
      `\n MongoDb Connected Successfully !! DB Host ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("Failed To Connect MongoDb");
    process.exit(1);
  }
};
export { connectDB };
