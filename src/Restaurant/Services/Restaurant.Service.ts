import { Restaurant } from "@prisma/client";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
import restaurantRepository from "../Repository/Restaurant.Repository";

class RestaurantService {
  static async createRestaurant(restaurant: CreateRestaurantI): Promise<void> {
    await restaurantRepository.createRestaurant(restaurant);
  }

  static async findAllRestaurant(): Promise<Restaurant[]> {
    return restaurantRepository.findAllRestaurant();
  }
  
  static async findRestaurantById(restaurant_id: number): Promise<Restaurant> {
    return restaurantRepository.findRestaurantById(restaurant_id);
  }
}

export default RestaurantService;
