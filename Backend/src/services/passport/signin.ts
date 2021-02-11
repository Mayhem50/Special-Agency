import { Strategy } from "passport-local";
import Credential, { getCredential } from "../../models/credential";
import bCrypt from "bcrypt-nodejs";
import { PassportStatic } from "passport";
import { getUserByEmail } from "../../models/user";

export default (passport: PassportStatic) => {
  passport.use(
    "signin",
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        try {
          const credential = await getCredential(username);
          if (!credential) {
            console.log("User Not Found with username " + username);
            return done(null, false);
          }
          if (!bCrypt.compareSync(password, credential.password)) {
            console.log("Invalid Password");
            return done(null, false); // redirect back to login page
          }
          const user = await getUserByEmail(credential.email);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
