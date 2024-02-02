import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT | 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is started on ${port} port.`);
});
