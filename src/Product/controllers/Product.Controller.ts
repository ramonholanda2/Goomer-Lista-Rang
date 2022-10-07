import { NextFunction, Request, Response } from "express";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { CreatePromotionForProduct } from "../dto/CreatePromotionForProduct";
import { DeleteProductDTO } from "../dto/DeleteProductDTO";
import { ProductService } from "../service/Product.service";

export class ProductController {
  static async createProductForRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para criar um produto para um restaurante.'
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
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para buscar um produto de um restaurante.'
    try {
      return res.json(
        await ProductService.findProductByRestaurant(
          Number(req.query.restaurant_id)
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
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint atualizar um produto de um restaurante.'
    try {
      const updateProductByRestaurantPayload: CreateProductDTO = req.body;
      return res
        .status(204)
        .send(
          await ProductService.updateProductByRestaurant(
            Number(req.params.product_id),
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
    // #swagger.tags = ['Products']
    // #swagger.description = 'deleta um produto de um restaurante.'

    try {
      const { restaurant_id }: DeleteProductDTO = req.body;
      const { product_id } = req.params;
      return res
        .status(204)
        .send(
          await ProductService.deleteProductByRestaurant(
            Number(product_id),
            restaurant_id
          )
        );
    } catch (err) {
      next(err);
    }
  }

  static async addPromotionForProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createPromotionBody: CreatePromotionForProduct = req.body;
      return res
        .status(201)
        .send(await ProductService.addPromotionForProduct(createPromotionBody));
    } catch (err) {
      next(err);
    }
  }
}
