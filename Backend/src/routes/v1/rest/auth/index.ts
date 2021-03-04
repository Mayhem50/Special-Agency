import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { getUserById } from "../../../../models/user";
import { failResponse, successResponse } from "../../../../utils/express-response";
import { create, authenticate, logout } from "../../../../services/auth";
import GoogleRouter from './socials/google';

const router = Router();

router.post("/auth", (req, res, next) => {
  console.log("Sign Up");
  create(req, res, next);
});

router.post("/auth/login", (req, res, next) => {
  console.log("Credential Login");
  authenticate(req, res, next);
});

router.get("/auth/logout", (req, res) => {
  console.log("Logout");
  logout(req, res);
});

router.use('/auth/google', GoogleRouter);

export default router;
