import { Router, Request, Response } from "express";
import { addPostulatedMission, getPostulatedMissions, deletePostulatedMission } from "../../../../models/postulated-mission";
import { failResponse, successResponse } from "../../../../utils/express-response";
import jwtauth from "../../../../services/jwt-auth/rest";

const router = Router();

router.post("/postulated-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Add a postulated mission");
  console.log(req.query.mission);
  addPostulatedMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch(() => failResponse(req, res, 500));
});

router.get("/postulated-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all postulated missions");
  getPostulatedMissions((req as any).user)
    .then((missions) => successResponse(req, res, missions))
    .catch(() => failResponse(req, res, 500));
});

router.delete("/postulated-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all postulated missions");
  deletePostulatedMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch(() => failResponse(req, res, 500));
});

export default router;
