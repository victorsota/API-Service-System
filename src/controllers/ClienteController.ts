import { Request, Response } from "express";
import { clienteRepository } from "../repositories/ClienteRepository";
import { produtoRepository } from "../repositories/ProdutoRepository";

export class ClienteController {
  async create(req: Request, res: Response) {
    const { nome, cpf, email, telefone, endereco } = req.body;

    try {
      const newCliente = await clienteRepository.create({
        nome,
        cpf,
        email,
        telefone,
        endereco,
      });
      await clienteRepository.save(newCliente);
      return res.status(201).json(newCliente);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
