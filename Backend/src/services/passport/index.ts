import passport from "passport";
import signin from "./signin";
import signup from "./signup";
//import googleAuth from "./passport-google.js";
import { getUserById, User } from "../../models/user";
import { PassportStatic } from "passport";
import { NextFunction, Request, Response } from "express";
import jwt from "jwt-simple";
import config from "../config";
import { failResponse, successResponse } from "../../utils/express-response";

function initPassport(passport: PassportStatic) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id as string)
      .then((user) => done(null, user))
      .catch((error) => done(error, null));
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  signin(passport);
  signup(passport);
  //googleAuth(passport);
}

initPassport(passport);
export default passport;

function login(req: Request, res: Response, next: NextFunction, user: any) {
  req.login(user, (err) => {
    if (err) return next(err);

    const token = jwt.encode(user._id, config.JWT_PASSWORD);
    const result = {
      user: user,
      token: token,
      id: user._id
    };

    successResponse(req, res, result);
  });
}

export function create(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("signup", (err, user) => {
    if (err || !user) return failResponse(req, res, 500, err);
    login(req, res, next, user);
  })(req, res, next);
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("signin", (err, user, info) => {
    console.log("login");
    if (err) return next(err);
    if (!user) return failResponse(req, res, 500);
    login(req, res, next, user);
  })(req, res, next);
}

export function logout(req: Request, res: Response, next: NextFunction) {
  console.log("logout");
  req.logout();
  successResponse(req, res);
}
