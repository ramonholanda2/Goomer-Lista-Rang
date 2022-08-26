import express from "express";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import restaurantController from "../Controller/Restaurant.Controller";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";

const router = express.Router();
router.get(
  "/",
  dtoValidationMiddleware(CreateRestaurantDTO),
  restaurantController.createRestaurant
);
export default router;
