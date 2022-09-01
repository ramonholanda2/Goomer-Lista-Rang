import { expect } from "chai";
import RestaurantController from "../Controller/Restaurant.Controller";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";
let should = chai.should();
import "mocha";

chai.use(chaiHttp);

describe("Restaurant", () => {

  describe("/GET Restaurant", () => {

    it("checking getAllRestaurants", (done) => {
      chai
        .request(app.getApplication())
        .get("/restaurants")
        .end((err, res) => {
            res.should.have.status(200); 
            res.body.should.be.a("array");
            done();
          });
      });

  })

  describe("/POST Restaurant", () => {
    it("add new Restaurant" , (done) => {
      const newRestaurant = {
        name: "eat in tech",
        image: "https://www.google.com.br/imgres?imgurl=https%3A%2F%2Fopengraph.githubassets.com%2Ff7b3b27d2bbc982ded321289efb78edb6c842e0218fb08ba8f869d8a2f7c288b%2FIrrelon%2Fmocha-expect&imgrefurl=https%3A%2F%2Fgithub.com%2FIrrelon%2Fmocha-expect&tbnid=kce7U3vCLgV-UM&vet=12ahUKEwiEpeGWv_T5AhV1NLkGHaZNBkEQMygDegUIARC0AQ..i&docid=HI3Sf6wM1tC1LM&w=1200&h=600&itg=1&q=mocha%20expect&ved=2ahUKEwiEpeGWv_T5AhV1NLkGHaZNBkEQMygDegUIARC0AQ",
        address: "rua 263",
        opening_hours: "15 as 20"
      } 

      chai.request(app.getApplication()).post('/restaurants')
      .send(newRestaurant)
      .end((err, res) => {
        res.should.have.status(201);
        done()
      })

    })
  })

});
