import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { getUserById } from "../../../../models/user";
import { failResponse, successResponse } from "../../../../utils/express-response";
import {create, authenticate, logout} from "../../../../services/passport";

const router = Router();

router.post("/users", function (req, res, next) {
  console.log("Add users: Sign Up");
  create(req, res, next);
});

router.post("/users/:action", function (req, res, next) {
  console.log("Get user : Login");
  console.log(req.query);

  if (req.params.action == "login") authenticate(req, res, next);
  else if (req.params.action == "logout") logout(req, res, next);
  else next();
});

router.get("/users/:id", jwtauth, function (req, res, next) {
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
