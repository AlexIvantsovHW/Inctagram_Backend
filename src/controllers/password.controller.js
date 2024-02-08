import crypto from 'crypto';
import { User } from '../../shared/db/models/user.module.js';
import { PasswordResetToken } from '../../shared/db/models/password.module.js';
import { sendPasswordResetEmail } from '../../shared/configs/nodemailer-config.js';
import { Validate } from '../routes/registration/validation/validation.js';
import { verifyRecaptcha } from './services/verifyRecaptcha.js';
import mongoose from 'mongoose';

export const requestPasswordReset = async (req, res) => {
    try {
      const { email, recaptchaToken } = req.body;

      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      
      if (!isRecaptchaValid) {
        return res.status(400).send('Ошибка reCAPTCHA');
      }

      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send('Пользователь не найден');
      }
  
      const passwordRecoveryCode = crypto.randomBytes(20).toString('hex');
      const tokenExpiry = Date.now() + 3600000; 
  
      const passwordResetToken = new PasswordResetToken({
        user: user._id,
        passwordRecoveryCode,
        expiryDate: tokenExpiry
      });
  
      await passwordResetToken.save();
      await sendPasswordResetEmail(email, passwordRecoveryCode);
  
      res.status(200).send('Ссылка для сброса пароля отправлена на электронную почту');
    } catch (err) {
      console.log(err)
      res.status(500).send('Ошибка сервера');
    }
  };

  export const validatePasswordResetToken = async (req, res) => {
    try {
      const { passwordRecoveryCode } = req.body;
      const passwordResetToken = await PasswordResetToken.findOne({ passwordRecoveryCode }).populate('user');
  
      if (!passwordResetToken) {
        return res.status(400).send('Токен сброса пароля не найден');
      }
  
      if (passwordResetToken.expiryDate < Date.now()) {
        return res.status(400).json({ userEmail: passwordResetToken.user.email, message: 'Срок действия токена истек' });
      }
  
      res.status(200).send('Токен действителен');
    } catch (err) {
      res.status(500).send('Ошибка сервера');
    }
  };
  
  export const changePassword = async (req, res) => {
    try {
      const { passwordRecoveryCode, password } = req.body;

      const passwordResetToken = await PasswordResetToken.findOne({ passwordRecoveryCode })
        .populate('user');
  
      if (!passwordResetToken) {
        return res.status(400).send('Недействительный токен сброса пароля');
      }
  
      const user = passwordResetToken.user;
      if (!user) {
        return res.status(404).send('Пользователь не найден');
      }

      const validator = new Validate(password, '');
      const validationResponse = validator.validatePassword();

      if (validationResponse !== true) {
        return res.status(400).send(validationResponse); 
      }
  
      user.password = password;
      await user.save();
  
      await PasswordResetToken.deleteOne({ _id: passwordResetToken._id });

      const sessionsCollection = mongoose.connection.collection('sessions');

      const userId = user._id.toString(); 
      const regex = new RegExp(`"passport":{"user":"${userId}"}`);

      sessionsCollection.deleteMany({ session: { $regex: regex }});

      res.status(200).send('Пароль успешно обновлен');
    } catch (err) {
        console.log(err)
      res.status(500).send('Ошибка сервера');
    }
  };
  