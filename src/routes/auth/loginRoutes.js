import express from "express";
export const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.send("Страница входа");
});
