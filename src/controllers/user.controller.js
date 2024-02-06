import { ObjectId } from "mongodb";
import { User } from "./../../shared/db/models/user.module.js";
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
export const loginUser = (req, res) => {
  User.findById({ _id: new ObjectId(req.params.id) })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => handleCatch(res, `Something goes wrong.... ${err}`));
};
