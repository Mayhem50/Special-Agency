import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { addKind, getKinds, getSubKinds } from "../../../../models/kind.js";
import { failResponse, successResponse } from "../../../../utils/express-response";

const router = Router();

router.post("/kinds", jwtauth, (req, res) => {
  console.log("Create a kind");
  addKind(req.body)
    .then(() => successResponse(req, res, req.body))
    .catch((error) => failResponse(req, res, 500));
});

router.get("/kinds", (req, res) => {
  console.log("Get all kinds");
  getKinds()
    .then((kinds) => successResponse(req, res, kinds))
    .catch((error) => failResponse(req, res, 500));
});

router.get("/kinds/:id", (req, res) => {
  console.log("Get sub kinds");
  getSubKinds(req.params.id)
    .then((kinds) => successResponse(req, res, kinds))
    .catch((error) => failResponse(req, res, 500));
});

export default router;
