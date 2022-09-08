import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";
import restaurantRepository from "../Repository/Restaurant.Repository";
import { Restaurant } from "@prisma/client";
import NotFound from "../../Exceptions/NotFoundException";

class RestaurantService {
  static async createRestaurant(
    restaurant: CreateRestaurantI
  ): Promise<Restaurant> {
    return await restaurantRepository.createRestaurant(restaurant);
  }

  static async findAllRestaurant(): Promise<Restaurant[]> {
    return await restaurantRepository.findAllRestaurant();
  }

  static async findRestaurantById(restaurant_id: string): Promise<Restaurant | NotFound> {
    const restaurant = await restaurantRepository.findRestaurantById(restaurant_id);

    if(!restaurant) {
      throw new NotFound(`restaurante com o id ${restaurant_id} não encontrado`)
    }
    
    return restaurant
  }

  static async updateRestaurantById(restaurant: Restaurant): Promise<void> {
    return await restaurantRepository.updateRestaurantById(restaurant);
  }

  static async deleteRestaurantById(restaurant_id: string): Promise<void> {
    const restaurant = await this.findRestaurantById(restaurant_id);
    if (!restaurant) {
      console.log(`este restaurante não foi encontrado - id: ${restaurant_id}`);
    }
    await restaurantRepository.deleteRestaurantById(restaurant_id);
  }
}

export default RestaurantService;
