import express from "express";

export const googleRouter = express.Router();

googleRouter.get("/", (req, res) => {
  res.send("Страница регистрации гугла");
});
