import { addFavoriteMission, deleteFavoriteMission } from "../../../models/favorite-mission";
import { JwtSocket } from "../../../services/jwt-auth/socket";
import Io from "socket.io";

export default (io: Io.Server, socket: JwtSocket) => {
  socket.on("add-favorite-mission", async (data) => {
    console.log("add favorite mission");

    try {
      await addFavoriteMission(socket.user, data._mission);
      socket.emit("add-favorite-mission", data._mission);
    } catch (error) {}
  });

  socket.on("delete-favorite-mission", async (data) => {
    console.log("delete favorite mission");

    try {
      await deleteFavoriteMission(socket.user, data._mission);
      socket.emit("delete-favorite-mission", data._mission);
    } catch (error) {}
  });
};
