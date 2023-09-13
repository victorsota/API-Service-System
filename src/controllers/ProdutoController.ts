import { Request, Response } from "express";
import { produtoRepository } from "../repositories/ProdutoRepository";
import { TipoProdutoRepository } from "../repositories/TipoProdutoRepository";

export class ProdutoController {
  async create(req: Request, res: Response) {
    const { nome, descricao, preco, quantidade, tipoId } = req.body;

    try {
      const tipo = await TipoProdutoRepository.findOneBy({
        id: Number(tipoId),
      });
      if (!tipo) {
        return res.status(400).json({ message: "Tipo de produto não existe" });
      }
      const newProduto = await produtoRepository.create({
        nome,
        descricao,
        preco,
        quantidade,
        tipo,
      });
      await produtoRepository.save(newProduto);
      return res.status(201).json(newProduto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
