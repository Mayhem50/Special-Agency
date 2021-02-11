import Io from "socket.io";
import MissionModel from "../../../models/mission";
import KindModel from "../../../models/kind";
import SocketModel from "../../../models/socket";
import { JwtSocket } from "../../../services/jwt-auth/socket";
import { CallbackError } from "mongoose";
import ChatModel from "../../../models/chat";
import UserModel from "../../../models/user";

export default (io: Io.Server, socket: JwtSocket) => {
  socket.on("new-message", async (data) => {
    if (!data.chat) {
      console.log("new chat");

      const chat = new ChatModel({
        _mission: data.mission,
        _sponsor: data.mission._sponsor,
        _agent: data._sender,
        messages: [
          {
            _sender: socket.user._id,
            _receiver: data.mission._sponsor._id,
            message: data.message,
            date: Date.now(),
            tag: data.tag ? data.tag : null
          }
        ],
        sponsorUnreads: 1
      });

      try {
        await chat.save();
        await UserModel.populate(chat, { path: "_agent _sponsor" });
        await MissionModel.populate(chat, { path: "_mission" });
        await KindModel.populate(chat._mission, { path: "_type" });
        const socketItem = await SocketModel.findOne({ _user: data._receiver._id });

        if (socketItem) {
          io.to(socketItem.socket).emit("new-chat", chat);
        }
        socket.emit("new-chat", chat);
      } catch (error) {}
    } else {
      try {
        const chat = await ChatModel.findOne({ _id: data.chat });
        if (chat) {
          const response = {
            message: {
              _sender: socket.user._id,
              _receiver: data._receiver,
              message: data.message,
              date: Date.now(),
              tag: data.tag ? data.tag : null
            },
            chat: chat
          };
          chat.messages.push(response.message);

          chat.agentUnreads += socket.user.id == chat._sponsor._id ? 1 : 0;
          chat.sponsorUnreads += socket.user.id == chat._sponsor._id ? 0 : 1;

          await chat.save();

          const socketItem = await SocketModel.findOne({ _user: data._receiver._id });

          if (socketItem) {
            io.to(socketItem.socket).emit("new-message", response);
          }
          socket.emit("new-message", response);
        }
      } catch (error) {}
    }
  });

  socket.on("read-chat", async (data) => {
    if (data == null) {
      return;
    }

    const chat = await ChatModel.findOne({ _id: data._id });

    if (chat) {
      if (socket.user._id === chat._sponsor._id) {
        chat.sponsorUnreads = 0;
      } else {
        chat.agentUnreads = 0;
      }

      chat.save();
      socket.emit("read-chat", chat);
    }
  });
};
