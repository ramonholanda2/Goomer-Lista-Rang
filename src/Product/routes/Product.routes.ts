import express from "express";
import Router from "../../interfaces/Router.interface";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import { ProductController } from "../controllers/Product.Controller";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { DeleteProductDTO } from "../dto/DeleteProductDTO";

class ProductRouter implements Router {
  public router: express.Router = express.Router();
  constructor() {
    this.router.post(
      "/",
      dtoValidationMiddleware(CreateProductDTO),
      ProductController.createProductForRestaurant
    );
    this.router.put(
      "/:product_id",
      dtoValidationMiddleware(CreateProductDTO),
      ProductController.updateProductByRestaurant
    );
    this.router.delete(
      "/:product_id",
      dtoValidationMiddleware(DeleteProductDTO),
      ProductController.deleteProductByRestaurant
    );
    this.router.get(
      "/",
      ProductController.findProductByRestaurant
    );
  }
}

export default new ProductRouter();
