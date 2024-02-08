import session from 'express-session';

export const sessionConfig = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false
};

export default session(sessionConfig);
