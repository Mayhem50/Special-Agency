import { Router } from "express";
import { authenticateGoogle } from "../../../../../services/auth";

const router = Router();

router.post("/", (req, res, next) => {
  console.log("Get user : Login");
  authenticateGoogle(req, res, next);
});

export default router;
