import express from "express";
import { authRouter } from "./auth/authRoutes.js";

const mainRouter = express.Router();
const handleCatch = (res, error) => {
  res.status(500).json({ error });
};
mainRouter.get("/", (req, res) => {
  res.send("Main router");
});

mainRouter.use("/auth", authRouter);
export default mainRouter;
