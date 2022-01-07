import * as passport from 'passport';
import { User } from '../models/user';
import * as passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;


passport.use(new LocalStrategy({

    // Strategy is based on username & password.  Substitute email for username.
    usernameField: 'email'
},

    (email, password, done) => {


    User
        .findOne({email})
        .then(user => {
        if (!user) {
            return done(null, false, {errors: {email: "incorrect"}});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {errors: {password: "incorrect"}});
        }
        return done(null, user);
        })
        .catch(done);

}));
