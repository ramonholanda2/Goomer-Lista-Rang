import express from "express";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import restaurantController from "../Controller/Restaurant.Controller";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";
import Router from "../../interfaces/Router.interface";
import { OpeningHoursDTO } from "../dto/OpeningHoursDTO";

class RestaurantRouter implements Router {
  public router: express.Router = express.Router();

  constructor() {
    this.router.post(
      "/restaurants/",
      dtoValidationMiddleware(CreateRestaurantDTO),
      dtoValidationMiddleware(OpeningHoursDTO, false, "opening_hours"),
      restaurantController.createRestaurant
    );
    this.router.get("/restaurants/", restaurantController.findAllRestaurant);
    this.router.get(
      "/restaurants/:restaurant_id",
      restaurantController.findRestaurantById
    );
    this.router.put(
      "/restaurants/",
      dtoValidationMiddleware(UpdateRestaurantDTO),
      dtoValidationMiddleware(OpeningHoursDTO, false, "opening_hours"),
      restaurantController.updateRestaurantById
    );
    this.router.delete(
      "/restaurants/:restaurant_id",
      restaurantController.deleteRestaurantById
    );
  }
}

export default new RestaurantRouter();
