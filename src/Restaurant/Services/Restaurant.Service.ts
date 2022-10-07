import restaurantRepository from "../Repository/Restaurant.Repository";
import { Restaurant } from "@prisma/client";
import NotFoundException from "../../Exceptions/NotFoundException";
import { CreateRestaurantDTO } from "../dto/CreateRestaurant.dto";
import { RestaurantOpeningHoursI } from "../interfaces/RestaurantOpeningHours.interface";
import { FindRestaurant } from "../interfaces/FindRestaurant.interface";
import { UpdateRestaurantDTO } from "../dto/UpdateRestaurant.dto";
import ArgumentNotValidException from "../../Exceptions/ArgumentNotValidException";

class RestaurantService {
  static async createRestaurant(
    restaurant: CreateRestaurantDTO
  ): Promise<Restaurant> {
    const { hour_open, hour_close } = restaurant.opening_hours;
    this.validateHours(hour_open, hour_close);
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
    const { hour_open, hour_close } = restaurant.opening_hours;
    this.validateHours(hour_open, hour_close);
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
      days_week,
      hour_open,
      hour_close,
    } = restaurant;

    return {
      restaurant_id,
      address,
      image,
      name,
      opening_hours: { hour_open, hour_close, days_week },
    };
  }

  static validateHours(hour_open: string, hour_close: string) {
    const open_number = Number(hour_open.substring(0, 2));
    const close_number = Number(hour_close.substring(0, 2));

    if (open_number > close_number) {
      throw new ArgumentNotValidException(
        "hour_open tem que ser maior que hour_close"
      );
    }

    if (open_number === close_number) {
      const open_minute = Number(hour_open.substring(3, 5));
      const close_minute = Number(hour_close.substring(3, 5));

      if (close_minute - open_minute < 15) {
        throw new ArgumentNotValidException(
          "mínimo 15 minutos entre horário aberto e fechado"
        );
      }
    }
  }
}

export default RestaurantService;
