import { Router } from "express";
import { TipoProdutoContoller } from "./controllers/TipoProdutoController";

const routes = Router();

routes.post("/tipos_produto", new TipoProdutoContoller().create);

export default routes;
