import express from "express";
import { createUser, validateVerificationToken, resendVerificationEmail } from "../../controllers/user.controller.js";

export const registerRouter = express.Router();

registerRouter.post("/register", createUser);
registerRouter.post("/register-code-check", validateVerificationToken);
registerRouter.post("/resend-register-email", resendVerificationEmail);
