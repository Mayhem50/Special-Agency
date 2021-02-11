import UserModel, { getUserById, User } from "../../models/user";
import jwt from "jwt-simple";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { failResponse } from "../../utils/express-response";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers["Authorization"] as string | undefined)?.split(' ')[1];

  if (token) {
    const id = jwt.decode(token, config.JWT_PASSWORD);

    try {
      const user = await getUserById(id);
      if (!user) return res.sendStatus(403);
      req.user = user;
      return next();
    } catch (error) {
      return failResponse(req, res, 403, error);
    }
  }
  return failResponse(req, res, 403, "No token provided");
};
