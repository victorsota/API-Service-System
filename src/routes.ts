import { Router } from "express";
import { TipoProdutoContoller } from "./controllers/TipoProdutoController";
import { ProdutoController } from "./controllers/ProdutoController";
import { ClienteController } from "./controllers/ClienteController";
import { VendaController } from "./controllers/VendaController";
import { UserController } from "./controllers/UserController";
import { Auth } from "./controllers/AuthController";

const routes = Router();

//Rotas de Usuario
routes.post("/users", new UserController().create);
routes.get("/users", new UserController().list);
routes.get("/users/:id", new UserController().findById);
routes.post("/login", new Auth().login);
routes.get("/login", new Auth().login);
routes.post(
  "/RotaAuth",
  new Auth().verifyToken,
  new UserController().autentication
);
routes.get(
  "/user",
  new Auth().verifyToken,
  new UserController().getUserByToken
);
routes.get("/profile", new Auth().getProfile);

//Rotas Tipo Produto
routes.post("/tipos_produto", new TipoProdutoContoller().create);
routes.get("/tipos_produtos", new TipoProdutoContoller().listar);
routes.get("/tipos_produto/:id", new TipoProdutoContoller().listarPorId);
routes.delete("/tipos_produto/:id", new TipoProdutoContoller().delete);
routes.put("/tipos_produto/:id", new TipoProdutoContoller().update);

//Rotas Produtos
routes.post("/produto", new ProdutoController().create);
routes.get("/produtos", new ProdutoController().listar);
routes.get("/produto/:id", new ProdutoController().listarPorId);
routes.delete("/produto/:id", new ProdutoController().delete);

//Rotas Clientes
routes.post("/cliente", new ClienteController().create);
routes.get("/clientes", new ClienteController().listar);
routes.get("/cliente/:id", new ClienteController().listarPorId);
routes.delete("/cliente/:id", new ClienteController().delete);
routes.put("/cliente/:id", new ClienteController().update);

//Rotas Vendas
routes.post("/venda", new VendaController().create);
routes.get("/vendas", new VendaController().listar);

export default routes;
