import { JwtSocket } from "../../../services/jwt-auth/socket";
import Io from "socket.io";
import { addPostulatedMission, deletePostulatedMission } from "../../../models/postulated-mission";

export default (io: Io.Server, socket: JwtSocket) => {
  socket.on("add-postulated-mission", async (data) => {
    console.log("add postulated mission");

    try {
      await addPostulatedMission(socket.user, data._mission);
      socket.emit("add-postulated-mission", data._mission);
    } catch (error) {}
  });

  socket.on("delete-postulated-mission", async (data) => {
    console.log("delete postulated mission");

    try {
      await deletePostulatedMission(socket.user, data._mission);
      socket.emit("delete-postulated-mission", data._mission);
    } catch (error) {}
  });
};
