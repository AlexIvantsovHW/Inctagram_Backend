import express from "express";
import bodyParser from "body-parser";
import mainRoutes from "./src/routes/mainRoutes.js";
import passport from 'passport';
import { initialPassport } from './shared/configs/passport-config.js';
import connectDB from "./shared/configs/database-config.js";
import corsMiddleware from "./src/middleware/corsMiddleware.js";
import sessionConfig from "./src/middleware/sessionConfig.js";

const app = express();
const port = process.env.PORT | 3001;

connectDB()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(corsMiddleware);

initialPassport(passport);

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", mainRoutes);

app.listen(port, () => {
  console.log(`Server is started on ${port} port.`);
});