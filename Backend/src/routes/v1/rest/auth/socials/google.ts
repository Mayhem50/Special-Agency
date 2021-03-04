import { Router } from "express";
import { authenticateGoogle, authenticateGoogleCallback } from "../../../../../services/passport";
import { successResponse } from "../../../../../utils/express-response";

const router = Router();

router.get("/", (req, res, next) => {
  console.log("Get user : Login");
  authenticateGoogle(req, res, next);
});

router.get('/callback', authenticateGoogleCallback, (req, res, next) => {
  successResponse(req, res, req.user);
});

export default router;
