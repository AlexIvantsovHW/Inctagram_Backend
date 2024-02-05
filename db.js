import { MongoClient } from "mongodb";
const URL = `mongodb://localhost:27017/Inctagram`;
let dbConnection;
export const connectToDb = (cb) => {
  MongoClient.connect(URL)
    .then((client) => {
      console.log("DB is connected");
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      return cb(err);
    });
};
export const getDb = () => dbConnection;
