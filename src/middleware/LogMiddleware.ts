import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Log } from "../entities/Log";
import { logRepository } from "../repositories/LogRepository";

export async function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, originalUrl, params, query, body } = req;

  const newLog = logRepository.create({
    path: originalUrl,
    params: JSON.stringify(query),
    request: JSON.stringify(body),
    method: JSON.stringify(method),
    response: "",
  });

  try {
    await logRepository.save(newLog);
  } catch (error) {
    console.error("Erro ao salvar o registro de log:", error);
  }

  // Ajuste o tipo da função res.send para corresponder ao esperado
  const originalSend: typeof res.send = res.send;
  res.send = function (...args: any[]): any {
    newLog.response = JSON.stringify(args);
    logRepository.save(newLog).catch((error) => {
      console.error("Erro ao salvar o registro de log:", error);
    });

    originalSend.apply(res, args as [body?: any]);
  };

  next();
}
