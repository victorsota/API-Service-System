import { Router } from "express";
import { TipoProdutoContoller } from "./controllers/TipoProdutoController";
import { ProdutoController } from "./controllers/ProdutoController";
import { ClienteController } from "./controllers/ClienteController";
import { VendaController } from "./controllers/VendaController";

const routes = Router();

//Rotas Tipo Produto
routes.post("/tipos_produto", new TipoProdutoContoller().create);
routes.get("/tipos_produto", new TipoProdutoContoller().listar);
routes.get("/tipos_produto/:id", new TipoProdutoContoller().listarPorId);
routes.delete("/tipos_produto/:id", new TipoProdutoContoller().delete);
routes.put("/tipos_produto/:id", new TipoProdutoContoller().update);

//Rotas Produtos
routes.post("/produto", new ProdutoController().create);
routes.get("/produto", new ProdutoController().listar);
routes.get("/produto/:id", new ProdutoController().listarPorId);
routes.delete("/produto/:id", new ProdutoController().delete);

//Rotas Clientes
routes.post("/cliente", new ClienteController().create);
routes.get("/cliente", new ClienteController().listar);
routes.get("/cliente/:id", new ClienteController().listarPorId);
routes.delete("/cliente/:id", new ClienteController().delete);
routes.put("/cliente/:id", new ClienteController().update);

//Rotas Vendas
routes.post("/venda", new VendaController().create);
routes.get("/venda", new VendaController().listar);

export default routes;
