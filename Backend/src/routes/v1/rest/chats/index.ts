import { Router } from "express";
import jwtauth from "../../../../services/jwt-auth/rest";
import { addChat, getUserChats, getUserMissionChat } from "../../../../models/chat";
import { failResponse, successResponse } from "../../../../utils/express-response";

const router = Router();

router.post("/chats", jwtauth, (req, res) => {
  console.log("Create a chat");
  addChat(req.body.chat)
    .then(() => successResponse(req, res, req.body.chat))
    .catch(() => failResponse(req, res, 500));
});

router.get("/chats/:id", jwtauth, (req, res) => {
  getUserChats(req.params.id)
    .then((chats) => successResponse(req, res, chats))
    .catch(() => failResponse(req, res, 500));
});

router.get("/chats/:mission/:id", jwtauth, (req, res) => {
  getUserMissionChat(req.params.id, req.params.mission)
    .then((chat) => successResponse(req, res, chat))
    .catch(() => failResponse(req, res, 500));
});

export default router;
