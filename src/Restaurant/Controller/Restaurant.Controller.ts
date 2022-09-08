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
    const body: CreateRestaurantI = req.body;
    return res.status(201).send(await RestaurantService.createRestaurant(body));
  }

  static async findAllRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.json(await RestaurantService.findAllRestaurant());
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
    const restaurant: Restaurant = req.body;
    res.json(await RestaurantService.updateRestaurantById(restaurant));
  }

  static async deleteRestaurantById(
    { params }: Request,
    res: Response,
    next: NextFunction
  ) {
    res
      .status(204)
      .json(
        await RestaurantService.deleteRestaurantById(
          params.restaurant_id
        )
      );
  }
}

export default RestaurantController;
