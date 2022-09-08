import { Product } from "@prisma/client";
import { ProductRepository } from "../repository/Product.Repository";
import { CreateProductI } from "../../interfaces/CreateProduct.interface";
import RestaurantService from "../../Restaurant/Services/Restaurant.Service";

export class ProductService {
  static async createProductForRestaurant(
    product: CreateProductI
  ): Promise<Product> {
    await RestaurantService.findRestaurantById(String(product.restaurant_id));
    return await ProductRepository.createProductForRestaurant(product);
  }
  
  static async findProductByRestaurant(
    restaurant_id: string
  ): Promise<Product[]> {
    await RestaurantService.findRestaurantById(restaurant_id);
    return await ProductRepository.findProductByRestaurant(restaurant_id);
  }
}
