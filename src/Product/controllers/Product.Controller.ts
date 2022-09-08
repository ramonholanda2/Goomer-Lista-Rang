import { NextFunction, Request, Response } from "express";
import { CreateProductI } from "../../interfaces/CreateProduct.interface";
import { ProductService } from "../service/Product.service";

export class ProductController {
  static async createProductForRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body: CreateProductI = req.body;
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
  /*
    
      static async updateRestaurantById(
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
          const restaurant: Restaurant = req.body;
          res.status(204).send(await RestaurantService.updateRestaurantById(restaurant));
        } catch (err) {
          next(err);
        }
      }
    
      static async deleteRestaurantById(
        { params }: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
          res
            .status(204)
            .json(
              await RestaurantService.deleteRestaurantById(params.restaurant_id)
            );
        } catch (err) {
          next(err);
        }
      } */
}
