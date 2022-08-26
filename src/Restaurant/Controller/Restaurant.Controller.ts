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
    await RestaurantService.createRestaurant(body);
    return res.status(201).send();
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
    return res.json(
      await RestaurantService.findRestaurantById(Number(params.restaurant_id))
    );
  }
}

export default RestaurantController;
