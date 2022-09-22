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
      "/products/",
      dtoValidationMiddleware(CreateProductDTO),
      ProductController.createProductForRestaurant
    );
    this.router.put(
      "/products/:product_id",
      dtoValidationMiddleware(CreateProductDTO),
      ProductController.updateProductByRestaurant
    );
    this.router.delete(
      "/products/:product_id",
      dtoValidationMiddleware(DeleteProductDTO),
      ProductController.deleteProductByRestaurant
    );
    this.router.get(
      "/products/",
      ProductController.findProductByRestaurant
    );
  }
}

export default new ProductRouter();
