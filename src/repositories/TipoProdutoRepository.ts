import { AppDataSource } from "../data-source";
import { TipoProduto } from "../entities/TipoProduto";

export const TipoProdutoRepository = AppDataSource.getRepository(TipoProduto);
