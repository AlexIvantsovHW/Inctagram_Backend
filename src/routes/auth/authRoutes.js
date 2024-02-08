import express from "express";
import { gitRouter } from "./gitAuth.js";
import { googleRouter } from "./googleAuth.js";
import { passwordRecoveryRouter } from './passwordRecoveryRoutes.js';
import { loginUser } from "../../controllers/user.controller.js";

export const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.use("/google", googleRouter);
authRouter.use("/git", gitRouter);
authRouter.use("/", passwordRecoveryRouter);
