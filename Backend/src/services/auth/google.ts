import { NextFunction, Request, Response } from "express";
import { addCredential, getCredential } from "../../models/credential";
import { addUser } from "../../models/user";
import { failResponse, successResponse } from "../../utils/express-response";

export default {
  async signUp(req: Request, res: Response) {
    try {
      let credential = await getCredential(req.body.credential.email);
      if (credential) return failResponse(req, res, 400, "User already exists");

      credential = await addCredential(req.body.credential.email, req.body.credential.id);
      if (!credential) throw new Error("Fail to create credentials");
      return await addUser({ ...req.body.user, email: req.body.credential.email, _credential: credential._id });
    } catch (error) {}
  }
};
