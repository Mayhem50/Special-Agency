import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { addMission, getMissions, updateMission, deleteMission } from "../../../../models/mission";
import { failResponse, successResponse } from "../../../../utils/express-response";

const router = Router();

router.post("/missions", jwtauth, (req, res) => {
  console.log("Create a mission");
  addMission(req.body.mission, (req as any).user._id)
    .then(() => successResponse(req, res))
    .catch(() => failResponse(req, res, 500));
});

router.get("/missions", jwtauth, function (req, res) {
  console.log("Get all missions");
  getMissions(req.query, parseInt(req.query.page as string), parseInt(req.query.pageSize as string))
    .then((missions) => successResponse(req, res, missions))
    .catch(() => failResponse(req, res, 500));
});

router.put("/missions", jwtauth, function (req, res) {
  console.log("Update mission: " + req.params.id);
  updateMission(req.body.mission)
    .then((mission) => successResponse(req, res, mission))
    .catch(() => failResponse(req, res, 500));
});

router.delete("/missions/:id", jwtauth, (req, res) => {
  console.log("Delete mission: " + req.params.id);
  deleteMission(req.body.mission)
    .then((mission) => successResponse(req, res, mission))
    .catch(() => failResponse(req, res, 500));
});

export default router;
