import { NextFunction, Request, Response } from "express";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
class RestaurantController {

  static async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body: CreateRestaurantI = req.body;
    
    return res.status(200).json(body)
  }
}

export default RestaurantController;