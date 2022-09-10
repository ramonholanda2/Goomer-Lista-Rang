import { Product } from "@prisma/client";
import PrismaProduct from "../../prisma/PrismaClient";
import { CreateProductDTO } from "../dto/CreateProductDTO";

export class ProductRepository {
  static async createProductForRestaurant(
    product: CreateProductDTO
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

  static async findProductByRestaurant(
    restaurant_id: string
  ): Promise<Product[]> {
    return await PrismaProduct.$queryRaw<
      Product[]
    >`SELECT * FROM Product WHERE Product.restaurant_id = ${restaurant_id}`;
  }

  static async updateProductByRestaurant(
    product_id: string,
    product: CreateProductDTO
  ) {
    await PrismaProduct.$executeRaw<void>`UPDATE Product SET 
    name = ${product.name}, 
    image = ${product.image}, 
    category = ${product.category}, 
    price = ${product.price} 
  WHERE 
    product_id = ${product_id}`;
  }
}
