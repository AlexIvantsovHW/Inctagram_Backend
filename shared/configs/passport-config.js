import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../db/models/user.module.js';

export const initialPassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email: email });
      
            if (!user) {
              return done(null, false, { message: 'Пользователь не найден' });
            }
      
            if (!(await user.validatePassword(password))) {
              return done(null, false, { message: 'Неверный пароль' });
            }
      
            return done(null, user);
          
          } catch (error) {
            done(error);
          }
        }
      ));
      
      passport.serializeUser((user, done) => {
        done(null, user.id); 
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (err) {
          done(err);
        }
      });
      
}