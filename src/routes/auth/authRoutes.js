import express from "express";
import { gitRouter } from "./gitAuth.js";
import { googleRouter } from "./googleAuth.js";
import { loginRouter } from "./loginRoutes.js";
export const authRouter = express.Router();

authRouter.use("/login", loginRouter);
authRouter.use("/google", googleRouter);
authRouter.use("/git", gitRouter);
