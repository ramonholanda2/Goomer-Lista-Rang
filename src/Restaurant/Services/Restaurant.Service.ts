import { Restaurant } from "@prisma/client";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
import restaurantRepository from "../Repository/Restaurant.Repository";

class RestaurantService {
  static async createRestaurant(
    restaurant: CreateRestaurantI
  ): Promise<Restaurant> {
    return await restaurantRepository.createRestaurant(restaurant);
  }
}

export default RestaurantService;
