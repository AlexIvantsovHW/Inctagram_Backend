import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRoutes from "./src/routes/mainRoutes.js";
import mongoose from "mongoose";
import { dbURL } from "./shared/configs/configs.js";

const app = express();
const port = process.env.PORT | 3001;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(`Error is: ${err}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: "*" }));
app.use("/api", mainRoutes);
app.listen(port, () => {
  console.log(`Server is started on ${port} port.`);
});
