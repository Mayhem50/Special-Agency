import { addDraftMission, deleteDraftMission } from "../../../models/draft-mission";
import { JwtSocket } from "../../../services/jwt-auth/socket";
import Io from "socket.io";

export default (io: Io.Server, socket: JwtSocket) => {
  socket.on("add-draft-mission", async (data) => {
    console.log("add draft mission");
    try {
      await addDraftMission(socket.user, data._mission);
      socket.emit("add-draft-mission", data);
    } catch (error) {}
  });

  socket.on("delete-draft-mission", async (data) => {
    console.log("delete draft mission");
    try {
      deleteDraftMission(socket.user, data._mission);
      socket.emit("delete-draft-mission", data);
    } catch (error) {}
  });
};
