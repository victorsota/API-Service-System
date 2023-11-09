import Express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { logMiddleware } from "./middleware/LogMiddleware";

AppDataSource.initialize().then(() => {
  const app = Express();

  app.use(Express.json());

  app.use(logMiddleware);
  app.use(routes);

  return app.listen(process.env.PORT || 3000);
});
