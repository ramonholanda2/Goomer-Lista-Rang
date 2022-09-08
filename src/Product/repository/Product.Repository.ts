import { Product } from "@prisma/client";
import PrismaProduct from "../../prisma/PrismaClient";
import { CreateProductI } from "../../interfaces/CreateProduct.interface";

export class ProductRepository {
  static async createProductForRestaurant(
    product: CreateProductI
  ): Promise<Product> {
    const { category, restaurant_id, image, name, price } = product;
    await PrismaProduct.$executeRaw`INSERT INTO 
                  Product(restaurant_id,name, price, image, category)  
                  VALUES 
                  (${restaurant_id}, ${name}, ${price}, ${image}, ${category});`;

    const productCreated = await PrismaProduct.$queryRaw<
      Product[]
    >`SELECT * FROM Product WHERE product_id = (SELECT MAX(product_id)  FROM Product)`;
    return productCreated[0];
  }
}
