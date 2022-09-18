import { OpeningHours, Restaurant } from "@prisma/client";
import PrismaRestaurant from "../../prisma/PrismaClient";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";
import { FindRestaurant } from "../interfaces/FindRestaurant.interface";
import { RestaurantOpeningHoursI } from "../interfaces/RestaurantOpeningHours.interface";
class RestaurantRepository {
  static async createRestaurant(
    restaurant: CreateRestaurantDTO
  ): Promise<Restaurant> {
    const { address, image, name, opening_hours } = restaurant;

    await PrismaRestaurant.$executeRaw`INSERT INTO 
                "Restaurant"(name, address, image)  
                VALUES 
                (${name}, ${address}, ${image});`;

    const restaurantCreated = await PrismaRestaurant.$queryRaw<
      Restaurant[]
    >`SELECT * FROM "Restaurant" WHERE restaurant_id = (SELECT MAX(restaurant_id)  FROM "Restaurant")`;

    await PrismaRestaurant.$executeRawUnsafe(
      `insert into "OpeningHours"("hour_open","hour_close", "days_week",restaurant_id) 
    values ($1, $2, $3, $4)`,
      opening_hours.hour_open,
      opening_hours.hour_close,
      opening_hours.days_week,
      restaurantCreated[0].restaurant_id
    );

    return await this.findRestaurantById(restaurantCreated[0].restaurant_id);
  }

  static async findAllRestaurant(): Promise<FindRestaurant[]> {
    return await PrismaRestaurant. $queryRaw<
      FindRestaurant[]
    >`  select "rt".restaurant_id, 
              "rt".name, "rt".address, 
              "rt".image, 
              "oh".hour_open,  
              "oh".hour_close, 
              "oh".days_week 
                    from "Restaurant" as "rt" 
                    left join "OpeningHours" as "oh" 
                    on "oh".restaurant_id  = "rt".restaurant_id`;
  }

  static async findRestaurantById(
    restaurant_id: number
  ): Promise<RestaurantOpeningHoursI> {
    const restaurant = await PrismaRestaurant.$queryRaw<
      Restaurant[]
    >`select * from "Restaurant" as "rt" where "rt".restaurant_id = ${restaurant_id}`;
    const opening_hours = await PrismaRestaurant.$queryRaw<
      OpeningHours[]
    >`select * from "OpeningHours" as "oh" where "oh".restaurant_id = ${restaurant_id}`;

    const findRestaurant = {
      ...restaurant[0],
      opening_hours: { ...opening_hours[0] },
    };

    return findRestaurant;
  }

  static async updateRestaurantById(
    restaurant: UpdateRestaurantDTO
  ): Promise<void> {
    await PrismaRestaurant.$executeRaw`UPDATE "Restaurant" SET 
        name = ${restaurant.name}, 
        image = ${restaurant.image}, 
        address = ${restaurant.address}
      WHERE 
        restaurant_id = ${restaurant.restaurant_id}`;

    await PrismaRestaurant.$executeRaw`UPDATE "OpeningHours" SET 
            "hour_open" = ${restaurant.opening_hours.hour_open}, 
            "hour_close" = ${restaurant.opening_hours.hour_close}, 
            "days_week" = ${restaurant.opening_hours.days_week} 
          WHERE 
            restaurant_id = ${restaurant.restaurant_id}`;
  }

  static async deleteRestaurantById(restaurant_id: number): Promise<void> {
    await PrismaRestaurant.$executeRaw` DELETE FROM "OpeningHours" as "oh"
    WHERE 
      "oh".restaurant_id = ${restaurant_id}`;

    await PrismaRestaurant.$executeRaw` DELETE FROM "Restaurant" as "rt"
      WHERE 
        "rt".restaurant_id = ${restaurant_id}`;
  }
}

export default RestaurantRepository;
