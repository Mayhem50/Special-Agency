import Io from "socket.io";
import socketioJwt from "socketio-jwt";
import jwauthSocket from "./jwt-auth/socket";
import { insertOrUpdate, remove } from "../models/socket";
import { Server } from "http";
import config from "./config";
import MissionsRouter from "../routes/v1/socket/missions";
import ChatRouter from "../routes/v1/socket/chats";
import DraftMissionsRouter from "../routes/v1/socket/draft-missions";
import FavortieMissionsRouter from "../routes/v1/socket/favorite-missions";
import PostulatedMissionsRouter from "../routes/v1/socket/postulated-missions";

export function createSocket(server: Server) {
  console.log("Start ioSocket");

  const io = new Io.Server();
  io.attach(server);

  io.use(
    socketioJwt.authorize({
      secret: config.SOCKET_SECRET,
      handshake: true
    })
  );

  io.use(jwauthSocket);

  io.sockets.on("connection", async (socket) => {
    console.log("Granted user: " + socket.id);

    MissionsRouter(io, socket);
    ChatRouter(io, socket);
    DraftMissionsRouter(io, socket);
    FavortieMissionsRouter(io, socket);
    PostulatedMissionsRouter(io, socket);

    try {
      await insertOrUpdate(socket.user, socket);
    } catch (error) {
      console.error("Fail to add new User");
    }
  });

  io.sockets.on("deconnection", async (socket) => {
    console.log("User leave: " + socket.id);
    try {
      await remove(socket.user);
    } catch (error) {
      console.error("Fail to remove socket user");
    }
  });
}
