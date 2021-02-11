import { Router } from "express";
import { getUserByEmail } from "../../../../models/user";
import { failResponse, successResponse } from "../../../../utils/express-response";

const router = Router();

router.get("/check-available", (req, res) => {
  console.log("usernameAvailability");

  getUserByEmail(req.query.email as string)
    .then((user) => {
      successResponse(req, res, {
        message: user ? "used" : "free",
        isFree: !user
      });
    })
    .catch(() => failResponse(req, res, 500));
});

export default router;
