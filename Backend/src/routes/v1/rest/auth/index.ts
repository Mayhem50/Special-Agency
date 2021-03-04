import { Router } from "express";
import { create, authenticate, logout, authenticateSocial as createSocial } from "../../../../services/auth";

const router = Router();

router.post("/auth/email", (req, res, next) => {
  console.log("Email Signup");
  create(req, res, next);
});

router.post("/auth/social", (req, res, next) => {
  console.log("Social Signup");
  createSocial(req, res, next);
});

router.post("/auth/login", (req, res, next) => {
  console.log("Credential Login");
  authenticate(req, res, next);
});

router.get("/auth/logout", (req, res) => {
  console.log("Logout");
  logout(req, res);
});

export default router;
