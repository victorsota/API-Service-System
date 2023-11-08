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

  async listar(req: Request, res: Response) {
    try {
      const tiposProduto = await TipoProdutoRepository.find();
      return res.status(200).json(tiposProduto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async listarPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const tipoProduto = await TipoProdutoRepository.findOne({
        where: { id: parseInt(id) },
      });
      return res.status(200).json(tipoProduto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tipoProduto = await TipoProdutoRepository.findOne({
        where: { id: parseInt(id) },
      });
      if (!tipoProduto) {
        return res
          .status(404)
          .json({ message: "Tipo de produto não encontrado" });
      }
      await TipoProdutoRepository.remove(tipoProduto);
      return res
        .status(200)
        .json({ message: "Tipo de produto removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const tipoProduto = await TipoProdutoRepository.findOne({
        where: { id: parseInt(id) },
      });
      if (!tipoProduto) {
        return res
          .status(404)
          .json({ message: "Tipo de produto não encontrado" });
      }
      tipoProduto.nome = nome;
      await TipoProdutoRepository.save(tipoProduto);
      return res.status(200).json(tipoProduto);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
