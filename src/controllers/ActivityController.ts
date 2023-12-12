import { Request, Response } from "express";
import { ActivityRepository } from "../repositories/ActivitiesRepository";
import { debug } from "util";

export class ActivityController {
  async create(req: Request, res: Response) {
    try {
      const { nome, custo } = req.body;

      const serviceId = req.params.serviceId;
      debug(serviceId);

      const newActivity = ActivityRepository.create({
        nome,
        custo,
        service: { id: serviceId }, // Associa a atividade ao servico
      });

      if (!nome || !custo) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      await ActivityRepository.save(newActivity);

      return res.status(201).json(newActivity);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao criar Atividade",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const activities = await ActivityRepository.find();

      return res.status(200).json(activities);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao listar Atividades",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const activity = await ActivityRepository.findOne({ where: { id } });

      if (!activity) {
        return res.status(404).json({ message: "Atividade não encontrada" });
      }

      return res.status(200).json(activity);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao listar Atividade",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, custo } = req.body;

      const activity = await ActivityRepository.findOne({ where: { id } });

      if (!activity) {
        return res.status(404).json({ message: "Atividade não encontrada" });
      }

      activity.nome = nome;
      activity.custo = custo;

      await ActivityRepository.save(activity);

      return res.status(200).json(activity);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro ao atualizar Atividade",
      });
    }
  }
}
