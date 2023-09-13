import { Router } from "express";
import { TipoProdutoContoller } from "./controllers/TipoProdutoController";
import { ProdutoController } from "./controllers/ProdutoController";

const routes = Router();

routes.post("/tipos_produto", new TipoProdutoContoller().create);
routes.post("/produto", new ProdutoController().create);

export default routes;
