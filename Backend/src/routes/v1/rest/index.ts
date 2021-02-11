import { Router } from "express";
import passport from "../../../services/passport";

import UsersRouter from "./users";
import MissionsRouter from "./missions/missions";
import HelpersRouter from "./helpers";
import KindsRouter from "./kinds";
import ChatsRouter from "./chats";
import TranslationRouter from "./translations";
import FavoriteMissionsRouter from "./missions/favorite-missions";
import DraftMissionsRouter from "./missions/draft-missions";
import PostulatedMissionsRouter from "./missions/postulated-missions";

const router = Router();
const apiRouter = Router();

apiRouter
  .use(UsersRouter)
  .use(MissionsRouter)
  .use(HelpersRouter)
  .use(KindsRouter)
  .use(ChatsRouter)
  .use(TranslationRouter)
  .use(FavoriteMissionsRouter)
  .use(DraftMissionsRouter)
  .use(PostulatedMissionsRouter);

router.use("/v1", apiRouter);

export default router;
