import express from "express";
import { authRouter } from "./auth/authRoutes.js";
import { registrRouter } from "./registration/registration.js";

const mainRouter = express.Router();
const handleCatch = (res, error) => {
  res.status(500).json({ error });
};
mainRouter.get("/", (req, res) => {
  res.send("Main router");
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/registration", registrRouter);
export default mainRouter;
