import supertest from "supertest";
import { describe, expect, test, it } from "@jest/globals";
import RestaurantRoutes from "../routes/Restaurant.routes";
import app from "../../../app";

describe("Restaurant", () => {
  describe("restaurant route", () => {
    it("find all", async () => {
      const restaurantId = "id_inexistente";

      await supertest(app.getApplication())
        .get(`/restaurants/${restaurantId}`)
        .expect(200);
      
    });
  });
});
