import { Strategy } from "passport-local";
import { addUser } from "../../models/user";
import { addCredential, getCredential } from "../../models/credential";
import bCrypt from "bcrypt-nodejs";
import { PassportStatic } from "passport";

export default (passport: PassportStatic) => {
  passport.use(
    "signup",
    new Strategy(
      {
        usernameField: "credential[email]",
        passwordField: "credential[password]",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, username, password, done) => {
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(async () => {
            try {
              let credential = await getCredential(username);
              if (credential) return done(`User already exists with username: ${username}`);
              
              credential = await addCredential(username, createHash(password));
              if (!credential) throw new Error("Fail to create credentials");
              const newUser = await addUser({...req.body.user, email: username, _credential: credential._id});
              done(null, newUser);
  
            } catch (error) {
              console.error("Error in SignUp: " + error);
              return done(error);
            }
          });
      }
    )
  );

  // Generates hash using bCrypt
  const createHash = (password: string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};
