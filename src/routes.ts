// seuArquivoDeRotas.ts
import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { ServiceController } from "./controllers/ServiceController";

const routes = Router();

// Rotas sem autenticação
routes.post("/login", new AuthController().login);
routes.post("/users", new UserController().create);

// Middleware de autenticação para as rotas abaixo
// routes.use(authMiddleware);

// Rotas que exigem autenticação
routes.get("/profile", new AuthController().getProfile);
routes.post(
  "/RotaAuth",
  new AuthController().verifyToken,
  new UserController().autentication
);
routes.get(
  "/user",
  new AuthController().verifyToken,
  new UserController().getUserByToken
);

// Rotas de usuários
routes.get("/users", new UserController().list);
routes.get("/users/:id", new UserController().findById);

// Rotas de serviços
routes.get("/services", new ServiceController().list);
routes.get("/services/:id", new ServiceController().getById);
routes.put("/services/:id", new ServiceController().update);
routes.delete("/services/:id", new ServiceController().deactivate);
routes.post(
  "/services",
  new AuthController().verifyToken,
  new ServiceController().create
);

export default routes;
