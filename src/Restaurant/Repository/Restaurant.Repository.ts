import { Restaurant } from "@prisma/client";
import PrismaRestaurant from "../../prisma/PrismaClient";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";

class RestaurantRepository {
  static async createRestaurant(
    restaurant: CreateRestaurantI
  ): Promise<Restaurant> {
    try {
      const { address, image, opening_hours, name } = restaurant;
      return await PrismaRestaurant.restaurant.create({
        data: {
          address,
          image, 
          opening_hours,
          name,
        },
      });
    } catch (err) {
      new Error();
    }
  }
}

export default RestaurantRepository;
