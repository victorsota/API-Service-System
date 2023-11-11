import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";

type jwtPayload = {
  id: string;
};

export class Auth {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Preencha todos os dados",
      });
    }

    //verifica se o email é valido
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

      if (user.password !== password) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }

      const userId = user.id;
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "chave_secreta",
        {
          expiresIn: "1h", // Define a validade do token (opcional)
        }
      );
      return res
        .status(200)
        .json({ token, message: "Logado com sucesso", userId });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao efetuar login",
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: "Não autorizado",
      });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, "chave_secreta") as jwtPayload;

    const user = await UserRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({
        message: "Não autorizado",
      });
    }

    const { password: _, ...userLogged } = user;

    return res.status(200).json({ userLogged });
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
      jwt.verify(token, "chave_secreta");
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Não autorizado",
      });
    }
  }
}
