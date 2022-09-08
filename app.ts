import express from "express";
import bodyParser from "body-parser";
import CatchErrorsHTTP from "./src/middlewares/CatchErrorsHTTP";
import ProductRoutes from "./src/Product/routes/Product.routes";
import RestaurantRoutes from "./src/Restaurant/routes/Restaurant.routes";
class App {
  private Application: express.Application = express();

  constructor() {
    this.Application.use(bodyParser.json());
    this.Application.use("/restaurants", RestaurantRoutes.router);
    this.Application.use("/products", ProductRoutes.router);
    this.Application.use(CatchErrorsHTTP);
  }

  getApplication() {
    return this.Application;
  }
}

export default new App();
