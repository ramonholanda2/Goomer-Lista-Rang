import { Product } from "@prisma/client";
import { CreateProductI } from "../../interfaces/CreateProduct.interface";
import { ProductRepository } from "../repository/Product.Repository";

export class ProductService {
    static async createProductForRestaurant(
      restaurant: CreateProductI
    ): Promise<Product> {
      return await ProductRepository.createProductForRestaurant(restaurant);
    }
}  