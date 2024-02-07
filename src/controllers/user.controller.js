import { ObjectId } from "mongodb";
import { User } from "./../../shared/db/models/user.module.js";
import { Validate } from "./../routes/registration/services/validation.js";
export const handleCatch = (res, error) => {
  res.status(500).json({ error });
};
export const validateForm = (res, message) => {
  return res.status(500).send(message);
};
export const createUser = (req, res) => {
  console.log(req.body);
  let password = req.body.password;
  let email = req.body.email;
  const dataValidate = new Validate(password, email);
  if (dataValidate.fullFormValidation() != true) {
    return res.status(500).send(dataValidate.fullFormValidation());
  }
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
export const loginUser = (req, res) => {
  User.findById({ _id: new ObjectId(req.params.id) })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => handleCatch(res, `Something goes wrong.... ${err}`));
};
