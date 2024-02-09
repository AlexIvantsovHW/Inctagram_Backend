import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dbURL } from '../../shared/configs/configs.js';

const sessionConfig = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbURL 
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } 
});

export default sessionConfig;
