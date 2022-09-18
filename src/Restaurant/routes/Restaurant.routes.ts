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
      "/",
      dtoValidationMiddleware(CreateRestaurantDTO),
      dtoValidationMiddleware(OpeningHoursDTO, false, "opening_hours"),
      restaurantController.createRestaurant
    );
    this.router.get("/", restaurantController.findAllRestaurant);
    this.router.get("/:restaurant_id", restaurantController.findRestaurantById);
    this.router.put(
      "/",
      dtoValidationMiddleware(UpdateRestaurantDTO),
      dtoValidationMiddleware(OpeningHoursDTO, false, "opening_hours"),
      restaurantController.updateRestaurantById
    );
    this.router.delete(
      "/:restaurant_id",
      restaurantController.deleteRestaurantById
    );
  }
}

export default new RestaurantRouter();
