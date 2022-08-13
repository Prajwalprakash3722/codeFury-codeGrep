import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export type IRest = {
  req: Request;
  res: Response;
}

export type IMRest = {
  req: Request;
  res: Response;
  next: NextFunction;
}

/**
 * Modified Request & Response to include the user token
 */
// export type MRest = {
//   req: Request & IUserToken;
//   res: Response;
// }