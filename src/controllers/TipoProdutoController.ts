import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TipoProduto } from "../entities/TipoProduto";
import { TipoProdutoRepository } from "../repositories/TipoProdutoRepository";
// criar um tipo de produto
export class TipoProdutoContoller {
  TipoProdutoRepository = AppDataSource.getRepository(TipoProduto);
  async create(req: Request, res: Response) {
    const { nome } = req.body;
    // validar os dados
    if (!nome) {
      return res.status(400).json({ message: "Nome é obrigatório" });
    }

    try {
      const newTipoProduto = TipoProdutoRepository.create({ nome });
      // salvar no banco de dados (INSERT)
      await TipoProdutoRepository.save(newTipoProduto);

      return res.status(201).json(newTipoProduto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
