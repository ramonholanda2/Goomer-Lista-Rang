import { Restaurant } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";
import RestaurantService from "../Services/Restaurant.Service";
class RestaurantController {
  static async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // #swagger.tags = ['Restaurants']
    // #swagger.description = 'Endpoint para criar um restaurante.'
    try {
      const body: CreateRestaurantDTO = req.body;
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
    // #swagger.tags = ['Restaurants']
    // #swagger.description = 'Endpoint para buscar todos os restaurantes.'
    try {
      return res.json(await RestaurantService.findAllRestaurant());
    } catch (err) {
      next(err);
    }
  }

  static async findRestaurantById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    // #swagger.tags = ['Restaurants']
    // #swagger.description = 'Busca restaurante pelo id'

    try {
      return res.json(
        await RestaurantService.findRestaurantById(Number(req.params.restaurant_id))
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
    // #swagger.tags = ['Restaurants']
    // #swagger.description = 'Atualiza restaurante pelo id'

    try {
      const restaurant: UpdateRestaurantDTO = req.body;
      res
        .status(204)
        .send(await RestaurantService.updateRestaurantById(restaurant));
    } catch (err) {
      next(err);
    }
  }

  static async deleteRestaurantById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    // #swagger.tags = ['Restaurants']
    // #swagger.description = 'Apaga restaurante pelo id'
    try {
      res
        .status(204)
        .json(
          await RestaurantService.deleteRestaurantById(
            Number(req.params.restaurant_id)
          )
        );
    } catch (err) {
      next(err);
    }
  }
}

export default RestaurantController;
