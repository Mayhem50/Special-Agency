import { PassportStatic } from "passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import User, { getUserById } from "../../models/user";
import config from "../config";

export default (passport: PassportStatic) => {
  passport.use(
    "google",
    new Strategy(
      {
        clientID: config.GOOGLE_CLIENT.clientId,
        clientSecret: config.GOOGLE_CLIENT.clientSecret,
        //NOTE :
        //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
        //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/
        //then edit your /etc/hosts local file to point on your private IP.
        //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
        //if you use it.
        callbackURL: "http://127.0.0.1:3000/users/google-callback",
        passReqToCallback: true
      },
      (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        // asynchronous verification, for effect...
        process.nextTick(async () => {
          try {
            const user = await getUserById(profile.id);

            if (user) {
              // if a user is found, log them in
              return done(null, user);
            }
          } catch (error) {
            return done(error);
          }
        });
      }
    )
  );
};
