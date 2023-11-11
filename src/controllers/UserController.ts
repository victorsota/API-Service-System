import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";

// cria um novo usuario
export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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

    // verifica se o email ja foi cadastrado
    const existingUser = await UserRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Já existe um usuário com este email",
      });
    }

    try {
      const newUser = await UserRepository.create({ name, email, password });
      await UserRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao criar usuário",
      });
    }
  }

  async list(req: Request, res: Response) {
    const users = await UserRepository.find({
      select: ["id", "name", "email"],
    });
    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserRepository.findOne({ where: { id } });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao Buscar usuário",
      });
    }
  }

  async getUserByToken(req: Request, res: Response) {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token de autenticação ausente" });
    }

    try {
      const decodedToken: any = jwt.verify(token, "chave_secreta");

      if (!decodedToken.userId) {
        return res.status(401).json({ message: "Token inválido" });
      }

      // Busque os dados do usuário com base no ID do usuário no token
      const user = await UserRepository.findOne(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Retorne os dados do usuário
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token inválido" });
    }
  }

  async autentication(req: Request, res: Response) {
    res.status(200).json({ message: "Autenticado com sucesso" });
  }
}
