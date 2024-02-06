import express from "express";
import { createUser } from "../../controllers/user.controller.js";

export const registrRouter = express.Router();

registrRouter.post("/", createUser);
