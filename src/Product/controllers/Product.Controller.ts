import { NextFunction, Request, Response } from "express";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { DeleteProductDTO } from "../dto/DeleteProductDTO";
import { ProductService } from "../service/Product.service";

export class ProductController {
  static async createProductForRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body: CreateProductDTO = req.body;
      return res
        .status(201)
        .send(await ProductService.createProductForRestaurant(body));
    } catch (err) {
      next(err);
    }
  }

  static async findProductByRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.json(
        await ProductService.findProductByRestaurant(
          String(req.query.restaurant_id)
        )
      );
    } catch (err) {
      next(err);
    }
  }

  static async updateProductByRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updateProductByRestaurantPayload: CreateProductDTO = req.body;
      return res
        .status(204)
        .send(
          await ProductService.updateProductByRestaurant(
            req.params.product_id,
            updateProductByRestaurantPayload
          )
        );
    } catch (err) {
      next(err);
    }
  }

  static async deleteProductByRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { restaurant_id }: DeleteProductDTO = req.body;
      const { product_id } = req.params
      return res
        .status(204)
        .send(
          await ProductService.deleteProductByRestaurant(
            product_id,
            restaurant_id
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
