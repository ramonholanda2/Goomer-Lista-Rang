import express from "express";
import Router from "../../interfaces/Router.interface";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import { ProductController } from "../controllers/Product.Controller";
import { CreateProductDTO } from "../dto/CreateProductDTO";

class ProductRouter implements Router {
  public router: express.Router = express.Router();
  constructor() {
    this.router.post(
      "/",
      dtoValidationMiddleware(CreateProductDTO),
      ProductController.createProductForRestaurant
    );
  }
}

export default new ProductRouter();
