import { AppDataSource } from "../data-source";

export const logRepository = AppDataSource.getRepository("Log");
