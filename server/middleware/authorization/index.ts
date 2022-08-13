import { NextFunction, Response, Request } from "express";
import prisma from "../../lib/Prisma";
import { verifyToken } from "../../Util";


export default async function checkJwt(req: Request, res: Response, next: NextFunction) {

  const Atoken = req.headers.authorization;

  if (!Atoken) {
    return res.status(401).json({
      ok: false,
      message: 'Token Missing'
    })
  }

  const token = Atoken.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid Token'
    })
  }

  const TokenValid = await prisma.token.findFirst({
    where: {
      TokenString: token
    }
  })

  if (!TokenValid) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid Token'
    })
  } else if (TokenValid!.expiration < new Date()) {
    return res.status(401).json({
      ok: true,
      status: false,
      message: 'Token Expired'
    })
  }

  req.user = verifyToken(token);

  next();
}