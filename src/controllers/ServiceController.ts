// ServiceController.ts
import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { debug } from "util";

export class ServiceController {
  async create(req: Request, res: Response) {
    try {
      const { nome, bairro, cidade, estado, rua, numero, complemento } =
        req.body;

      const userId = req.user?.id;
      debug(userId);

      const newService = ServiceRepository.create({
        nome,
        bairro,
        cidade,
        estado,
        rua,
        numero,
        complemento,
        status: true,
        user: { id: userId }, // Associa o serviço ao usuário atual
      });

      await ServiceRepository.save(newService);

      return res.status(201).json(newService);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao criar serviço",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Buscar todos os serviços ativos do usuário
      const services = await ServiceRepository.find({
        where: { user: { id: userId }, status: true },
      });

      return res.status(200).json(services);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao listar serviços",
      });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Buscar o serviço pelo ID e pelo usuário
      const service = await ServiceRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      return res.status(200).json(service);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao buscar serviço",
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, bairro, cidade, estado, rua, numero, complemento } = req.body;

    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Buscar o serviço pelo ID e pelo usuário
      const service = await ServiceRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      // Atualizar os campos do serviço
      service.nome = nome;
      service.bairro = bairro;
      service.cidade = cidade;
      service.estado = estado;
      service.rua = rua;
      service.numero = numero;
      service.complemento = complemento;

      // Salvar as alterações no banco de dados
      await ServiceRepository.save(service);

      return res.status(200).json(service);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao atualizar serviço",
      });
    }
  }

  async deactivate(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Buscar o serviço pelo ID e pelo usuário
      const service = await ServiceRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      // Desativar o serviço (mudar o status para false)
      service.status = false;

      // Salvar as alterações no banco de dados
      await ServiceRepository.save(service);

      return res
        .status(200)
        .json({ message: "Serviço desativado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao desativar serviço",
      });
    }
  }
}
