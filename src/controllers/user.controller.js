import { ObjectId } from "mongodb";
import { User } from "./../../shared/db/models/user.module.js";
import passport from 'passport';
import { Validate } from '../routes/registration/validation/validation.js';
import jwt from 'jsonwebtoken';

export const handleCatch = (res, error) => {
  res.status(500).json({ error });
};

export const createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => handleCatch(res, "Something goes wrong...."));
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
  const validationResponse = validator.fullFormValidation();

  if (validationResponse !== true) {
    return res.status(400).json({ message: validationResponse });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {  
      return res.status(400).json(info);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const accessToken = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });   
      return res.status(200).json({accessToken});
    });
  })(req, res, next);
};
