import { Restaurant } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
import RestaurantService from "../Services/Restaurant.Service";
class RestaurantController {
  static async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body: CreateRestaurantI = req.body;
      return res
        .status(201)
        .send(await RestaurantService.createRestaurant(body));
    } catch (err) {
      next(err);
    }
  }

  static async findAllRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.json(await RestaurantService.findAllRestaurant());
    } catch (err) {
      next(err);
    }
  }

  static async findRestaurantById(
    { params }: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.json(
        await RestaurantService.findRestaurantById(params.restaurant_id)
      );
    } catch (err) {
      next(err);
    }
  }

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
  }
}

export default RestaurantController;
