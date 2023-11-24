// AuthController.ts
import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { JwtUtils } from "../utils/jwtUtils";
import * as bcrypt from "bcrypt";

type JwtPayload = {
  userId: string;
};

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Preencha todos os dados",
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email inválido",
      });
    }

    try {
      const user = await UserRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }

      const passwordHash = await bcrypt.compare(password, user.password);

      if (!passwordHash) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }

      const token = JwtUtils.generateToken(
        { userId: user.id, email: user.email },
        "1h"
      );

      return res
        .status(200)
        .json({ token, message: "Logado com sucesso", userId: user.id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao efetuar login",
      });
    }
  }
  async getProfile(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({
          message: "Não autorizado",
        });
      }

      const token = authorization.split(" ")[1];

      const { userId } = JwtUtils.verifyToken(token) as JwtPayload;

      const user = await UserRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(401).json({
          message: "Não autorizado",
        });
      }

      const { password: _, ...userLogged } = user;

      return res.status(200).json({ userLogged });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Não autorizado",
      });
    }
  }

  verifyToken(req: Request, res: Response, next: any) {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Não autorizado",
      });
    }

    try {
      const { userId } = JwtUtils.verifyToken(token) as JwtPayload;
      req.user = { id: userId };
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Não autorizado",
      });
    }
  }
}
