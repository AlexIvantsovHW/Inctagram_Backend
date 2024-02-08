import express from "express";
import { requestPasswordReset, validatePasswordResetToken, changePassword } from '../../controllers/password.controller.js';

export const passwordRecoveryRouter = express.Router();

passwordRecoveryRouter.post("/password-recovery-request", requestPasswordReset );
passwordRecoveryRouter.post("/password-recovery-code-check", validatePasswordResetToken );
passwordRecoveryRouter.post("/password-recovery", changePassword );

  