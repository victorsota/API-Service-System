import Express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = Express();

  app.use(Express.json());

  app.use(routes);

  return app.listen(process.env.PORT || 3000);
});
