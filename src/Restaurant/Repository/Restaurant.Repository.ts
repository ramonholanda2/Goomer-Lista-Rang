import { Restaurant } from "@prisma/client";
import PrismaRestaurant from "../../prisma/PrismaClient";
import { CreateRestaurantI } from "../../interfaces/CreateRestaurant.I";

class RestaurantRepository {
  static async createRestaurant(restaurant: CreateRestaurantI): Promise<void> {
    const { address, image, opening_hours, name } = restaurant;
    await PrismaRestaurant.$executeRaw`INSERT INTO 
                Restaurant(name, address, image, opening_hours) 
                VALUES 
                (${name}, ${address}, ${image}, ${opening_hours})`;
  }

  static async findAllRestaurant(): Promise<Restaurant[]> {
    return await PrismaRestaurant.$queryRaw<
      Restaurant[]
    >`SELECT * FROM Restaurant`;
  }

  static async findRestaurantById(restaurant_id: number): Promise<Restaurant> {
    const restaurant = await PrismaRestaurant.$queryRaw<
      Restaurant[]
    >`SELECT * FROM Restaurant Where Restaurant.restaurant_id = ${restaurant_id}`;
    return restaurant[0];
  }

  static async updateRestaurantById(restaurant: Restaurant): Promise<void> {
    await PrismaRestaurant.$executeRaw`UPDATE Restaurant SET 
        name = ${restaurant.name}, 
        image = ${restaurant.image}, 
        address = ${restaurant.address}, 
        opening_hours = ${restaurant.opening_hours} 
      WHERE 
        restaurant_id = ${restaurant.restaurant_id}`;
  }

  static async deleteRestaurantById(restaurant_id: number): Promise<void> {
    await PrismaRestaurant.$executeRaw` DELETE FROM Restaurant as rt
      WHERE 
        rt.restaurant_id = ${restaurant_id}`;
  }
}

export default RestaurantRepository;
