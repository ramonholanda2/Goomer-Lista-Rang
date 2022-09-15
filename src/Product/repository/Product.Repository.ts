import { Product } from "@prisma/client";
import PrismaProduct from "../../prisma/PrismaClient";
import { CreateProductDTO } from "../dto/CreateProductDTO";

export class ProductRepository {
  static async createProductForRestaurant(
    product: CreateProductDTO
  ): Promise<Product> {
    const { category, restaurant_id, image, name, price } = product;
    await PrismaProduct.$executeRaw`INSERT INTO 
                  "Product"(restaurant_id,name, price, image, category)  
                  VALUES 
                  (${restaurant_id}, ${name}, ${price}, ${image}, ${category});`;

    const productCreated = await PrismaProduct.$queryRaw<
      Product[]
    >`SELECT * FROM "Product" WHERE product_id = (SELECT MAX(product_id)  FROM "Product")`;
    return productCreated[0];
  }

  static async findProductByRestaurant(
    restaurant_id: number
  ): Promise<Product[]> {
    return await PrismaProduct.$queryRaw<
      Product[]
    >`SELECT * FROM "Product" WHERE restaurant_id = ${restaurant_id}`;
  }

  static async updateProductByRestaurant(
    product_id: number,
    product: CreateProductDTO
  ) {
    await PrismaProduct.$executeRaw<void>`UPDATE "Product" SET 
    name = ${product.name}, 
    image = ${product.image}, 
    category = ${product.category}, 
    price = ${product.price} 
  WHERE 
    product_id = ${product_id}`;
  }

  static async deleteProductByRestaurant(product_id: number) {
    await PrismaProduct.$executeRaw<void>`DELETE FROM "Product" as "pd" 
    WHERE 
    "pd".product_id = ${product_id}`;
  }

  static async findProductById(product_id: number): Promise<Product> {
    const product = await PrismaProduct.$queryRaw<
      Product[]
    >`Select * FROM "Product" as "pd" 
    WHERE 
    "pd".product_id = ${product_id}`;
    return product[0];
  }
}
