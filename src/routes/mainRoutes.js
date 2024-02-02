import express from "express";
import { authRouter } from "./auth/authRoutes.js";
import { registrRouter } from "./registration/registration.js";
import { logoutRouter } from "./logout/logout.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send("Hello world");
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/registration", registrRouter);
mainRouter.use("/logout", logoutRouter);

export default mainRouter;
