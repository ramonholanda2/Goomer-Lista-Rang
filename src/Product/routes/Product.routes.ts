import express from "express";
import Router from "../../interfaces/Router.interface";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import { OpeningHoursDTO } from "../../Restaurant/dto/OpeningHoursDTO";
import { ProductController } from "../controllers/Product.Controller";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { CreatePromotionForProduct } from "../dto/CreatePromotionForProduct";
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
    this.router.get("/products/", ProductController.findProductByRestaurant);
    this.router.post(
      "/products/addPromotion",
      dtoValidationMiddleware(CreatePromotionForProduct),
      dtoValidationMiddleware(OpeningHoursDTO, false, "opening_hours_promotion"),
      ProductController.addPromotionForProduct
    );
  }
}

export default new ProductRouter();
