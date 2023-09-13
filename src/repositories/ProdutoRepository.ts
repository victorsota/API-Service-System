import { AppDataSource } from "../data-source";

export const produtoRepository = AppDataSource.getRepository("Produto");
