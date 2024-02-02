import express from "express";

export const registrRouter = express.Router();

registrRouter.get("/login", (req, res) => {
  res.send("Страница входа");
});

registrRouter.get("/", (req, res) => {
  res.send("Страница регистрации");
});
