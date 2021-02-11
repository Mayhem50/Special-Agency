import { Router, Request, Response } from "express";
import { addFavoriteMission, getFavoriteMissions, deleteFavoriteMission } from "../../../../models/favorite-mission";
import { failResponse, successResponse } from "../../../../utils/express-response";
import jwtauth from "../../../../services/jwt-auth/rest";

const router = Router();

router.post("/favorite-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Add a favorite mission");
  console.log(req.query.mission);
  addFavoriteMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch((error) => failResponse(req, res, 500));
});

router.get("/favorite-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all favorite missions");
  getFavoriteMissions((req as any).user)
    .then((missions) => successResponse(req, res, missions))
    .catch((error) => failResponse(req, res, 500));
});

router.delete("/favorite-missions", jwtauth, (req: Request, res: Response) => {
  console.log("Get all favorite missions");
  deleteFavoriteMission((req as any).user, req.body._mission)
    .then(() => successResponse(req, res, req.body._mission))
    .catch((error) => failResponse(req, res, 500));
});

export default router;
