import { describe, it, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../../app";
import { ProductService } from "../Product/service/Product.service";
import RestaurantService from "../Restaurant/Services/Restaurant.Service";

const restaurantPayload = {
  name: "teste",
  image: "imagem12345",
  address: "endereço 233",
  opening_hours: "2 as 5",
};

const createProductPayload = {
  restaurant_id: Number(),
  name: "produto teste",
  image: "imagem teste",
  price: 50,
  category: "categoria teste",
};

const updateProductPayload = {
  product_id: Number(),
  restaurant_id: Number(),
  name: "produto atualizado",
  image: "imagem atualizado",
  price: 20,
  category: "categoria atualizado",
};

describe("Product", () => {
  describe("create product for restaurant", () => {
    it("create product and return status 201", async () => {
      const { restaurant_id } = await RestaurantService.createRestaurant(
        restaurantPayload
      );

      const createProduct = { ...createProductPayload, product_id: Number() };
      createProduct.restaurant_id = restaurant_id;

      const { body, statusCode } = await supertest(app.getApplication())
        .post(`/products`)
        .send(createProduct);

      createProduct.product_id = body.product_id;

      expect(statusCode).toBe(201);
      expect(body).toEqual(createProduct);

      await ProductService.deleteProductByRestaurant(
        body.product_id,
        restaurant_id
      );
      await RestaurantService.deleteRestaurantById(String(restaurant_id));
    });
  });

  
});