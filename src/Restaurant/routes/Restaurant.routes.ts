import express from "express";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import restaurantController from "../Controller/Restaurant.Controller";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";

const router = express.Router();
router.post(
  "/",
  dtoValidationMiddleware(CreateRestaurantDTO),
  restaurantController.createRestaurant
);
router.get("/", restaurantController.findAllRestaurant);
router.get("/:restaurant_id", restaurantController.findRestaurantById);
router.put("/", dtoValidationMiddleware(UpdateRestaurantDTO), restaurantController.updateRestaurantById);
export default router;
