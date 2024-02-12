import express from "express";
import { createUser } from "../../controllers/user.controller.js";

export const registerRouter = express.Router();

registerRouter.post("/", createUser);
