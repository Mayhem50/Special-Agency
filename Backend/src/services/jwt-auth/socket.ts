import { getUserById, User } from "../../models/user";
import jwt from "jwt-simple";
import { Socket } from "socket.io";
import { CallbackError, HookNextFunction } from "mongoose";
import config from "../config";

export interface JwtSocket extends Socket {
  error: Error | string;
  user: User;
}

export default async (socket: Socket & { user?: User; error?: Error | string }, next: HookNextFunction) => {
  const token = ((socket.handshake.query && socket.handshake.query.token) || socket.handshake.headers["x-access-token"]) as string;

  if (token) {
    const id = jwt.decode(token, config.JWT_PASSWORD);
    try {
      const user = await getUserById(id);
      if (!user) {
        socket.error = new Error("Authentication DB error");
        return next(socket.error);
      }

      socket.user = user;
      return next();
    } catch (error) {
      socket.error = new Error("Authentication Socket error");
      return next(socket.error);
    }
  }

  socket.error = new Error("Token error");
  return next(socket.error);
};
