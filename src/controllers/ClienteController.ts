import { Request, Response } from "express";
import { clienteRepository } from "../repositories/ClienteRepository";
import { produtoRepository } from "../repositories/ProdutoRepository";

export class ClienteController {
  async create(req: Request, res: Response) {
    const { nome, cpf, email } = req.body;
    try {
      const newCliente = await clienteRepository.create({
        nome,
        cpf,
        email,
      });
      await clienteRepository.save(newCliente);
      return res.status(201).json(newCliente);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const clientes = await clienteRepository.find();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async listarPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const cliente = await clienteRepository.findOne({ where: { id } });
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cliente = await clienteRepository.findOne({ where: { id } });
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      await clienteRepository.remove(cliente);
      return res.status(200).json({ message: "Cliente removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, cpf, email } = req.body;

    try {
      const cliente = await clienteRepository.findOne({ where: { id } });
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      cliente.nome = nome;
      cliente.cpf = cpf;
      cliente.email = email;
      await clienteRepository.save(cliente);
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
