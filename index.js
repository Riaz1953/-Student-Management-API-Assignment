import { connectDB } from "./src/db/connectDB.js";
import dotenv from "dotenv";
import dns from "node:dns";
import { app } from "./app.js";
dotenv.config({ path: ".env" });
dns.setServers(["1.1.1.1", "1.0.0.1"]);

connectDB()
  .then(() => {
    app.on("ERROR ", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Error", error);
    throw error;
  });
