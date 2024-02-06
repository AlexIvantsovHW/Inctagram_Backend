import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRoutes from "./src/routes/mainRoutes.js";
import { connectToDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";
const app = express();

const port = process.env.PORT | 3001;
let db;
const handleCatch = (res, error) => {
  res.status(500).json({ error });
};
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
app.get("/", (req, res) => {
  res.send("Hello Valera, this page for you!");
});
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server is started on ${port} port.`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error: ${err}`);
  }
});

app.get("/users", (req, res) => {
  const users = [];
  db.collection("Users")
    .find()
    .forEach((user) => users.push(user))
    .then(() => res.status(200).send(users))
    .catch((err) => handleCatch(res, "Something goes wrong...."));
});
app.get("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Users")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => res.status(200).send(doc))
      .catch((err) => handleCatch(res, "Something goes wrong...."));
  } else {
    handleCatch(res, "Id is wrong");
  }
});
app.delete("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Users")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => res.status(200).send(doc))
      .catch((err) => handleCatch(res, "Something goes wrong...."));
  } else {
    res.status(500).json("Wrong Id");
  }
});
app.post("/users", (req, res) => {
  db.collection("Users")
    .insertOne(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => handleCatch(res, "Something goes wrong...."));
});
app.patch("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
      .then((result) => res.status(200).send(result))
      .catch((err) => handleCatch(res, "Something goes wrong...."));
  } else {
    res.status(500).json("Wrong Id");
  }
});
