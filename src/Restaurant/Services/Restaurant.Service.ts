import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
import restaurantRepository from "../Repository/Restaurant.Repository";
import { Restaurant } from "@prisma/client";

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

  static async updateRestaurantById(restaurant: Restaurant): Promise<void> {
    return restaurantRepository.updateRestaurantById(restaurant);
  }

  static async deleteRestaurantById(restaurant_id: number): Promise<void> {
    const restaurant = await this.findRestaurantById(restaurant_id);
    if (!restaurant) {
      console.log(`este restaurant não foi encontrado - id: ${restaurant_id}`);
    }
    await restaurantRepository.deleteRestaurantById(restaurant_id);
  }
}

export default RestaurantService;
