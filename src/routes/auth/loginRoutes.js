import express from "express";
import { loginUser } from "../../controllers/user.controller.js";
export const loginRouter = express.Router();

loginRouter.get("/:id", loginUser);
