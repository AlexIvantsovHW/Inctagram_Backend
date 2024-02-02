import express from "express";

export const gitRouter = express.Router();

gitRouter.get("/", (req, res) => {
  res.send("Страница регистрации гита");
});
