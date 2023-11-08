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

  async listar(req: Request, res: Response) {
    try {
      const produtos = await produtoRepository.find();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async listarPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const produto = await produtoRepository.findOne({ where: { id } });
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const produto = await produtoRepository.findOne({ where: { id } });
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      await produtoRepository.remove(produto);
      return res.status(200).json({ message: "Produto removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade, tipoId } = req.body;

    try {
      const produto = await produtoRepository.findOne({ where: { id } });
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      const tipo = await TipoProdutoRepository.findOneBy({
        id: Number(tipoId),
      });
      if (!tipo) {
        return res.status(400).json({ message: "Tipo de produto não existe" });
      }
      produto.nome = nome;
      produto.descricao = descricao;
      produto.preco = preco;
      produto.quantidade = quantidade;
      produto.tipo = tipo;
      await produtoRepository.save(produto);
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
