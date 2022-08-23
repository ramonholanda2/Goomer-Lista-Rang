import { NextFunction, Request } from "express";
import { CreateUserDTO } from "../dto/CreateRestaurant.dto";
class RestaurantController {
  private async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body: CreateUserDTO = req.body;
    
  }
}

export default RestaurantController;