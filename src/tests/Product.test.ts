import { describe, it, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../../app";
import { ProductService } from "../Product/service/Product.service";
import RestaurantService from "../Restaurant/Services/Restaurant.Service";
import { OpeningHours } from "@prisma/client";
import { OpeningHoursDTO } from "../Restaurant/dto/OpeningHoursDTO";



const restaurantPayload = {
  name: "teste",
  image: "imagem12345",
  address: "endereço 233",
  opening_hours:<OpeningHoursDTO> {
    hour_open: "08:00",
    hour_close: "18:00",
    days_week: ["DOMINGO"],
  }
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
      await RestaurantService.deleteRestaurantById(restaurant_id);
    });
  });

  describe("update product for restaurant", () => {
    it("return status 204 and update product", async () => {
      const { restaurant_id } = await RestaurantService.createRestaurant(
        restaurantPayload
      );

      const createProduct = { ...createProductPayload, product_id: Number() };
      createProduct.restaurant_id = restaurant_id;

      const { product_id } = await ProductService.createProductForRestaurant(
        createProduct
      );
        
      
      updateProductPayload.product_id = product_id;
      updateProductPayload.restaurant_id = restaurant_id;
      
      const { body, statusCode } = await supertest(app.getApplication())
      .put(`/products/${product_id}`)
      .send(updateProductPayload);
      
      const productUpdated = await ProductService.findProductById(
        product_id
        );
        
      expect(statusCode).toBe(204);
      expect(updateProductPayload).toEqual(productUpdated);

      await ProductService.deleteProductByRestaurant(
        product_id,
        restaurant_id
      );
      await RestaurantService.deleteRestaurantById(restaurant_id);
    });
  }); 

  describe("delete product for restaurant", () => {
    it("return status 204 and delete product", async () => {
      const { restaurant_id } = await RestaurantService.createRestaurant(
        restaurantPayload
      );

      const createProduct = { ...createProductPayload, product_id: Number() };
      createProduct.restaurant_id = restaurant_id;

      const { product_id } = await ProductService.createProductForRestaurant(
        createProduct
      );

      await supertest(app.getApplication())
        .delete(`/products/${product_id}`)
        .send({ restaurant_id: restaurant_id })
        .expect(204);

      await supertest(app.getApplication())
        .get(`/products/${product_id}`)
        .send({ restaurant_id: restaurant_id })
        .expect(404);

      await RestaurantService.deleteRestaurantById(restaurant_id);
    });
  }); 
});
