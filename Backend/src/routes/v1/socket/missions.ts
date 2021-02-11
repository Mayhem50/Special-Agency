import Io from "socket.io";
import MissionSchema, { Mission } from "../../../models/mission";
import KindModel, { Kind } from "../../../models/kind";
import { JwtSocket } from "../../../services/jwt-auth/socket";
import { CallbackError } from "mongoose";

export default (io: Io.Server, socket: JwtSocket) => {
  socket.on("add-mission", (data: Mission) => {
    console.log("add mission");

    data.wishDates.sort((a, b) => a.timestamp - b.timestamp);

    const mission = new MissionSchema(data);
    mission._sponsor = socket.user;
    mission.save((err) => {
      if (err) {
        console.log("Error in Saving mission: " + err);
        throw err;
      }
      if (mission.status == "draft") {
        socket.emit("add-mission", mission);
      } else {
        io.emit("add-mission", mission);
      }
    });

    //socket.broadcast.emit('add-mission', mission);
  });

  socket.on("update-mission", (data) => {
    console.log("update mission");

    MissionSchema.findOneAndUpdate({ _id: data._id }, data, { upsert: true }, (err, mission) => {
      if (err) {
        throw err;
      }
      io.emit("update-mission", data);
    });
  });

  socket.on("accept-mission", (data) => {
    console.log("accept mission");
  });

  socket.on("postulate-mission", (data) => {
    console.log("postulate mission");

    //Chat.findOne({ '_mission': data.mission._id, '_sponsor' : data.mission._sponsor, '_agent' : { $in : [data.receiver, data.sender._id] } }, function (err, chat) {
    //    if (err) { throw (err); }
    //    if (!chat) {
    //        chat = new Chat({
    //            _mission : data.mission,
    //            _sponsor: data.mission._sponsor,
    //            _agent: data.sender._id,
    //            messages: [],
    //            unreads: 0
    //        });
    //        const message = new Message({
    //            message : data.lang == 'fr' ? default_strings.fr.default_message : default_strings.en.default_message,
    //            _sender: data.sender._id,
    //            _receiver: data.receiver._id,
    //            _chat : chat._id
    //        });
    //        message.save();
    //        chat.messages.push(message._id);
    //        chat.save(function (err) {
    //            if (err) { throw (err); }
    //            User.populate(chat, { path: '_agent _sponsor' }, function (err, chat) {
    //                Message.populate(chat, { path: 'messages' }, function (err, chat) {
    //                    Mission.findOneAndUpdate({ '_id' : chat._mission }, {status : 1, _agent : socket.user._id }, function (err, mission) {
    //                        if (err) { throw (err); }
    //                        if (!mission) { return; }
    //                        Kind.populate(mission, { path: '_kind' }, function (err, mission) {
    //                            if (err) { throw (err); }
    //                            chat._mission = mission
    //                            Socket.findOne({ '_user' : data.receiver._id }, function (err, sock) {
    //                                const unreads = chat.unreads;
    //                                if (sock) {
    //                                    ++chat.unreads;
    //                                    io.to(sock.socket).emit('new-chat', chat);
    //                                }
    //                                chat.unreads = unreads;
    //                                socket.emit('new-chat', chat);
    //                            });
    //                        });
    //                    });
    //                });
    //            });
    //        });
    //    }
    //    else {
    //        const message = new Message({
    //            message : data.lang == 'fr' ? default_strings.fr.default_message : default_strings.en.default_message,
    //            _sender: data.sender._id,
    //            _receiver: data.receiver,
    //            _chat : chat._id
    //        });
    //        message.save();
    //        chat.messages.push(message._id);
    //        if (data.sender._id != socket.user._id)
    //            ++chat.unreads;
    //        chat.save(function (err) {
    //            if (err) { throw (err) };
    //            Mission.findOneAndUpdate({ '_id' : chat._mission }, { status : 1, _agent : socket.user._id }, function (err, mission) {
    //                if (err) { throw (err); }
    //                if (!mission) { return; }
    //                Socket.findOne({ '_user' : data.receiver._id }, function (err, sock) {
    //                    const unreads = chat.unreads;
    //                    if (sock) {
    //                        ++chat.unreads;
    //                        io.to(sock.socket).emit('new-message', message);
    //                    }
    //                    chat.unreads = unreads;
    //                    socket.emit('new-message', message);
    //                });
    //            });
    //        });
    //    }
    //});
  });

  socket.on("delete-mission", (data) => {
    console.log("delete mission");

    MissionSchema.findOne({ _id: data._id }, (err: CallbackError, mission: Mission) => {
      if (err) {
        throw err;
      }

      if (!mission) {
        throw new Error("Mission not found");
      }

      mission.remove();

      io.emit("delete-mission", mission);
    });
  });
};
