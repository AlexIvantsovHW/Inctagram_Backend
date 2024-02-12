import { User } from "./../../shared/db/models/user.module.js";
import passport from 'passport';
import { Validate } from '../routes/registration/validation/validation.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../shared/configs/nodemailer-config.js";
import crypto from "crypto"
import { EmailVerificationToken } from "../../shared/db/models/registration.module.js";

export const handleCatch = (res, error) => {
  res.status(500).json({ error });
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const validator = new Validate(password, email, username);
  const validationResult = validator.fullFormValidation();

  if (validationResult !== true) {
    return res.status(400).send('Ошибка валидации');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Пользователь с таким email уже существует." });
    }

    const user = new User({ name: username, password, email });
    await user.save();

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 3600000;

    const newEmailVerificationToken = new EmailVerificationToken({
      user: user._id,
      verificationToken,
      expiryDate: tokenExpiry
    });

    await newEmailVerificationToken.save();

    const verificationUrl = `https://inctagram-front.vercel.app/auth/password-reset?code=${verificationToken}`;
      
    await sendEmail({
      email: user.email,
      subject: 'Подтвердите адрес эл.почты',
      url: verificationUrl,
      message: 'Для смены пароля перейдите по ссылке:'
    });

    res.status(201).json({ message: 'Пользователь создан. Отправлено письмо для подтверждения.' });
  } catch (error) {
    handleCatch(res, error);
  }
};

export const validateVerificationToken = async (req, res) => {
  try {
    const { code } = req.body;
    const validateEmailToken = await EmailVerificationToken.findOne({ verificationToken: code }).populate('user');

    if (!validateEmailToken) {
      return res.status(400).send('Токен подтверждения почты не найден');
    }

    if (validateEmailToken.expiryDate < Date.now()) {
      return res.status(400).json({ userEmail: validateEmailToken.user.email, message: 'Срок действия токена истек' });
    }

    validateEmailToken.user.isEmailVerified = true;
    await validateEmailToken.user.save();

    await EmailVerificationToken.deleteOne({ _id: validateEmailToken._id });

    res.status(200).send('Токен действителен');
  } catch (err) {
    console.log(err)
    res.status(500).send('Ошибка сервера');
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send('Пользователь с таким адресом электронной почты не найден.');
    }

    if (user.isEmailVerified) {
      return res.status(400).send('Электронная почта уже подтверждена.');
    }

    await EmailVerificationToken.deleteMany({ user: user._id });
    
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const newEmailVerificationToken = new EmailVerificationToken({
      user: user._id,
      verificationToken,
      expiryDate: new Date(Date.now() + 3600000) 
    });

    await newEmailVerificationToken.save();

    const verificationUrl = `https://inctagram-front.vercel.app/auth/password-reset?code=${verificationToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Повторное подтверждение адреса эл.почты',
      url: verificationUrl,
      message: `Пожалуйста, перейдите по ссылке для подтверждения вашей электронной почты:`,
    });

    res.status(200).send('Ссылка для подтверждения электронной почты была повторно отправлена.');
  } catch (err) {
    res.status(500).send('Ошибка сервера');
  }
};

export const deleteUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => handleCatch(res, "Something goes wrong...."));
};

export const loginUser = (req, res, next) => {
  const validator = new Validate(req.body.password, req.body.email);
  const validationResponse = validator.validateEmailAndPassword();

  if (validationResponse !== true) {
    return res.status(400).send('Ошибка валидации');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {  
      return res.status(400).json(info);
    }

    if (!user.isEmailVerified) {
      return res.status(401).send('Необходимо подтвердить электронную почту.');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const accessToken = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });   
      return res.status(200).json({accessToken, user});
    });
  })(req, res, next);
};
