import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { getUserById } from "../../../../models/user";
import { failResponse, successResponse } from "../../../../utils/express-response";

const router = Router();

router.get("/users/:id", jwtauth, (req, res, next) => {
  console.log("Get user");

  if (req.params.id) {
    getUserById(req.params.id)
      .then((user) => successResponse(req, res, user))
      .catch(() => failResponse(req, res, 500));
  } else {
    next();
  }
});

export default router;
