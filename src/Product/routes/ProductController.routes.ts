import express from "express";
import Router from "../../interfaces/Router.interface";

class ProductRouter implements Router {
  public router: express.Router;
  constructor() {
    
  }
}

export default new ProductRouter();
