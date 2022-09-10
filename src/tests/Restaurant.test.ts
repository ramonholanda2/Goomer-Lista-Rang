import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../app";
import RestaurantService from "../Restaurant/Services/Restaurant.Service";

const restaurantPayload = {
  name: "teste",
  image: "imagem12345",
  address: "endereço 233",
  opening_hours: "2 as 5",
};

const updateRestaurantPayload = {
  restaurant_id: Number(),
  name: "novo teste",
  image: "nova imagem",
  address: "novo endereço 233",
  opening_hours: "novo horarios a partir das 8",
};

describe("Restaurant", () => {
  describe("get restaurant does not exists", () => {
    it("return status 404 not find restaurant", async () => {
      const restaurantId = "id_inexistente";
      await supertest(app.getApplication())
        .get(`/restaurants/${restaurantId}`)
        .expect(404);
    });
  });

  describe("get restaurant by id route", () => {
    it("return status 200 and the restaurant", async () => {
      const restaurant = await RestaurantService.createRestaurant(
        restaurantPayload
      );

      const { body, statusCode } = await supertest(app.getApplication()).get(
        `/restaurants/${restaurant.restaurant_id}`
      );

      expect(statusCode).toBe(200);
      expect(body.restaurant_id).toBe(restaurant.restaurant_id);

      await RestaurantService.deleteRestaurantById(
        String(restaurant.restaurant_id)
      );
    });
  });

  describe("create restaurant route", () => {
    it("return status 201 and create restaurant", async () => {
      const { body, statusCode } = await supertest(app.getApplication())
        .post(`/restaurants`)
        .send(restaurantPayload);

      expect(statusCode).toBe(201);

      await RestaurantService.deleteRestaurantById(body.restaurant_id);
    });
  });

  describe("update restaurant route", () => {
    it("return status 204 and update restaurant", async () => {
      const restaurant = await RestaurantService.createRestaurant(
        restaurantPayload
      );

      updateRestaurantPayload.restaurant_id = restaurant.restaurant_id;

      const { statusCode } = await supertest(app.getApplication())
        .put(`/restaurants`)
        .send(updateRestaurantPayload);

      expect(statusCode).toBe(204);

      await RestaurantService.deleteRestaurantById(
        String(restaurant.restaurant_id)
      );
    });
  });

  describe("delete restaurant route", () => {
    it("return status 204 and delete restaurant", async () => {
      const restaurant = await RestaurantService.createRestaurant(
        restaurantPayload
      );
      await supertest(app.getApplication())
        .delete(`/restaurants/${restaurant.restaurant_id}`)
        .expect(204);
    });
  });
});