import { Restaurant } from "@prisma/client";
import PrismaRestaurant from "../../prisma/PrismaClient";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";

class RestaurantRepository {
  static async createRestaurant(restaurant: CreateRestaurantI): Promise<void> {
    try {
      const { address, image, opening_hours, name } = restaurant;
      await PrismaRestaurant.$executeRaw`INSERT INTO 
                Restaurant(name, address, image, opening_hours) 
                VALUES 
                (${name}, ${address}, ${image}, ${opening_hours})`;
    } catch (err) {
      new Error();
    }
  }
}

export default RestaurantRepository;
