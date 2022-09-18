import restaurantRepository from "../Repository/Restaurant.Repository";
import { DAYS_WEEK, Restaurant } from "@prisma/client";
import NotFoundException from "../../Exceptions/NotFoundException";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { RestaurantOpeningHoursI } from "../interfaces/RestaurantOpeningHours.interface";
import { FindRestaurant } from "../interfaces/FindRestaurant.interface";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";

class RestaurantService {
  static async createRestaurant(
    restaurant: CreateRestaurantDTO
  ): Promise<Restaurant> {
   
    return await restaurantRepository.createRestaurant(restaurant);
  }

  static async findAllRestaurant(): Promise<RestaurantOpeningHoursI[]> {
    const restaurants = await restaurantRepository.findAllRestaurant();
    return restaurants.map((restaurant) => this.ajustRestaurant(restaurant));
  }

  static async findRestaurantById(
    restaurant_id: number
  ): Promise<RestaurantOpeningHoursI> {
    const restaurant = await restaurantRepository.findRestaurantById(
      restaurant_id
    );

    if (
      !restaurant ||
      (Object.keys(restaurant).length == 1 &&
        Object.keys(restaurant.opening_hours).length === 0)
    ) {
      throw new NotFoundException(
        `restaurante com o id ${restaurant_id} não encontrado`
      );
    }

    return restaurant;
  }

  static async updateRestaurantById(
    restaurant: UpdateRestaurantDTO
  ): Promise<void> {
    await this.findRestaurantById(restaurant.restaurant_id);
    return await restaurantRepository.updateRestaurantById(restaurant);
  }

  static async deleteRestaurantById(restaurant_id: number): Promise<void> {
    const restaurant = await this.findRestaurantById(restaurant_id);
    if (!restaurant) {
      throw new NotFoundException(
        `restaurante com o id ${restaurant_id} não encontrado`
      );
    }
    await restaurantRepository.deleteRestaurantById(restaurant_id);
  }

  static ajustRestaurant(restaurant: FindRestaurant): RestaurantOpeningHoursI {
    const {
      restaurant_id,
      address,
      image,
      name,
      in: days_week,
      of,
      to,
    } = restaurant;

    return {
      restaurant_id,
      address,
      image,
      name,
      opening_hours: { of, to, in: days_week },
    };
  }

/*   static castDaysWeek(days: DAYS_WEEK[] | string): string {
    let days_week_cast: string = "";
    if (Array.isArray(days)) {
      days_week_cast = days_week_cast.concat("{");
      days
        .map((day: string) => DAYS_WEEK[day])
        .forEach((day: DAYS_WEEK) => {
          days_week_cast = days_week_cast.concat(`"${day}"`);
        });

        days_week_cast = days_week_cast.concat("}");
    }

    return days_week_cast;
  } */
}

export default RestaurantService;
