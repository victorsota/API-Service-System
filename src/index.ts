import Express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = Express();

  app.use(Express.json());

  app.get("/", (req, res) => {
    return res.json({ message: "Banco Conectado com sucesso!" });
  });

  return app.listen(process.env.PORT || 3000);
});
