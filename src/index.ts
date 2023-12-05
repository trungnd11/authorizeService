import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import role from "./routers/RoleRouter";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/", role);

const mongoAtlasUri = process.env.MONGO_URI;
const PORT = process.env.PORT;

try {
  mongoose.connect(
    mongoAtlasUri, { },
    () => console.log(" Mongoose is connected")
  );
  app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
  });
} catch (e) {
  console.log("could not connect", e);
  process.exit();
}
