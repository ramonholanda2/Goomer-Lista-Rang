import express from "express";
import bodyParser from "body-parser";
import RestaurantRoutes from "./src/Restaurant/routes/Restaurant.routes";
import CatchErrorsHTTP from "./src/middlewares/CatchErrorsHTTP";
class App {
  private Application: express.Application = express();

  constructor() {
    this.Application.use(bodyParser.json());
    this.Application.use("/restaurants", RestaurantRoutes);
    this.Application.use(CatchErrorsHTTP);
  }

  getApplication() {
    return this.Application;
  }
}

export default new App();
