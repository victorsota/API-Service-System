import { Router } from "express";
import { TipoProdutoContoller } from "./controllers/TipoProdutoController";
import { ProdutoController } from "./controllers/ProdutoController";
import { ClienteController } from "./controllers/ClienteController";

const routes = Router();

routes.post("/tipos_produto", new TipoProdutoContoller().create);
routes.post("/produto", new ProdutoController().create);
routes.post("/cliente", new ClienteController().create);

export default routes;
