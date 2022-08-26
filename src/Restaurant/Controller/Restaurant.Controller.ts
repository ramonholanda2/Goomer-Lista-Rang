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
}

export default RestaurantController;
