import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routes/userRoute.js"


const app = express() //initialiation app

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;


mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.err("connection error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//    reoute api
app.use("/api", route)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
   })
