import restaurantRepository from "../Repository/Restaurant.Repository";
import { Restaurant } from "@prisma/client";
import NotFoundException from "../../Exceptions/NotFoundException";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";

class RestaurantService {
  static async createRestaurant(
    restaurant: CreateRestaurantDTO
  ): Promise<Restaurant> {
    return await restaurantRepository.createRestaurant(restaurant);
  }

  static async findAllRestaurant(): Promise<Restaurant[]> {
    return await restaurantRepository.findAllRestaurant();
  }

  static async findRestaurantById(restaurant_id: string): Promise<Restaurant> {
    const restaurant = await restaurantRepository.findRestaurantById(
      restaurant_id
    );

    if (!restaurant) {
      throw new NotFoundException(
        `restaurante com o id ${restaurant_id} não encontrado`
      );
    }

    return restaurant;
  }

  static async updateRestaurantById(restaurant: Restaurant): Promise<void> {
    await this.findRestaurantById(String(restaurant.restaurant_id));
    return await restaurantRepository.updateRestaurantById(restaurant);
  }

  static async deleteRestaurantById(restaurant_id: string): Promise<void> {
    const restaurant = await this.findRestaurantById(restaurant_id);
    if (!restaurant) {
      throw new NotFoundException(
        `restaurante com o id ${restaurant_id} não encontrado`
      );
    }
    await restaurantRepository.deleteRestaurantById(restaurant_id);
  }
}

export default RestaurantService;
