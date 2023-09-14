import { Request, Response } from "express";
import { vendaRepository } from "../repositories/VendaRepository";
import { produtoRepository } from "../repositories/ProdutoRepository";
import { clienteRepository } from "../repositories/ClienteRepository";

export class VendaController {
  async create(req: Request, res: Response) {
    const { produtoId, clienteId } = req.body;
    try {
      //Validacao de produto e cliente
      const produto = await produtoRepository.findOneBy({
        id: Number(produtoId),
      });
      if (!produto) {
        return res.status(400).json({ message: "Produto não existe" });
      }
      const cliente = await clienteRepository.findOneBy({
        id: Number(clienteId),
      });
      if (!cliente) {
        return res.status(400).json({ message: "Cliente não existe" });
      }
      const newVenda = await vendaRepository.create({
        produto,
        cliente,
      });
      await vendaRepository.save(newVenda);
      return res.status(201).json(newVenda);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
