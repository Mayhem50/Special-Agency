import { Request, Response, Router } from "express";
import { addDraftMission, deleteDraftMission, getDraftMissions } from "../../../../models/draft-mission";
import { failResponse, successResponse } from "../../../../utils/express-response";
import jwtauth from "../../../../services/jwt-auth/rest";

const router = Router();

router.post("/draft-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Add a draft mission");
  console.log(req.query.mission);
  addDraftMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch((error) => failResponse(req, res, 500));
});

router.get("/draft-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all draft missions");
  getDraftMissions((req as any).user)
    .then((missions) => successResponse(req, res, missions))
    .catch((error) => failResponse(req, res, 500));
});

router.delete("/draft-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all draft missions");
  deleteDraftMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch((error) => failResponse(req, res, 500));
});

export default router;
