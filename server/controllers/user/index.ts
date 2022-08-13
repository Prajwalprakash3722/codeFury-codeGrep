import prisma from '../../lib/Prisma';
import { comparepassword, generateToken, hashpassword } from "../../Util";
import express from 'express';
import { Request } from 'express';
import { TokenType } from '@prisma/client';

const userController = {

  async registerUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username: name, useremail: email, password } = req.body;

    const User = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (User) {
      return res.status(400).json({
        ok: false,
        message: 'email already taken'
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashpassword(password),
          loggedIn: false
        },
        select: {
          id: true,
          name: true,
          email: true,
          loggedIn: true
        }
      })
      res.status(200).send({
        ok: true,
        message: "User Created Successfully",
        user: newUser
      })
    }
    next();
  },
  async loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    const { email, password } = req.body;
    const newUser = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (!newUser) {
      return res.status(400).json({
        ok: true,
        message: 'User does not exist'
      });
    } else if (!comparepassword(password, newUser.password)) {
      return res.status(400).json({
        ok: true,
        message: 'Invalid Credentials'
      });
    }
    const token = generateToken(newUser);

    await prisma.user.update({
      where: {
        id: newUser.id
      },
      data: {
        loggedIn: true,
        Token: {
          create: {
            type: TokenType.API,
            TokenString: token,
            expiration: new Date(Date.now() + 60 * 60 * 60)
          }
        }
      }
    })

    res.status(200).send({
      ok: true,
      token
    })

    next();
  },
  async logoutUser(req: Request, _res: express.Response, next: express.NextFunction) {

    const { id } = req.user;
    await prisma.user.update({
      where: {
        id: id as string
      },
      data: {
        loggedIn: false
      }
    })
    next();
  },

  async getUser(req: Request, res: express.Response, next: express.NextFunction) {

    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: id as string
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })

    if (user)
      res.status(200).send({ ok: true, user: user });
    else
      res.status(400).send({
        ok: false,
        message: 'User does not exist'
      })
    next();
  },
  modifyUser(req: Request, res: express.Response, next: express.NextFunction) {

    const { id } = req.user;
    const { username: name, useremail: email } = req.body;

    const newUser = prisma.user.update({
      where: {
        id: id as string
      },
      data: {
        email,
        name
      }
    })
    if (!newUser) {
      return res.status(400).json({
        ok: false,
        message: 'User does not exist'
      });
    }

    res.status(201).send({
      ok: true,
      message: 'User Modified Successfully'
    })

    next();
  },
  modifyPassword(req: Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.user;
    const { useremail: email, password } = req.body;

    const newUser = prisma.user.update({
      where: {
        id: id as string
      },
      data: {
        password: hashpassword(password),
      }
    })
    if (!newUser) {
      return res.status(400).json({
        ok: false,
        message: 'User does not exist'
      });
    }

    res.status(201).send({
      ok: true,
      message: 'Password Reset Successfully'
    })

    next();
  }
}


export default userController;