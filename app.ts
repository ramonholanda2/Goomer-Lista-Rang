import express from "express";
import bodyParser from "body-parser";
import CatchErrorsHTTP from "./src/middlewares/CatchErrorsHTTP";
import ProductRoutes from "./src/Product/routes/Product.routes";
import RestaurantRoutes from "./src/Restaurant/routes/Restaurant.routes";
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "./swagger.json"
class App {
  private Application: express.Application = express();

  constructor() {
    this.Application.use(bodyParser.json());
    this.Application.use(RestaurantRoutes.router);
    this.Application.use(ProductRoutes.router);
    this.Application.use(CatchErrorsHTTP);
    
    this.Application.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocs)) 
  }

  getApplication() {
    return this.Application;
  }
}

export default new App();
