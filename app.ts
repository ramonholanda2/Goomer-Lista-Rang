import express from "express";
import bodyParser from "body-parser";
import RestaurantRoutes from "./src/Restaurant/routes/Restaurant.routes"

const app = express();
app.use(bodyParser.json());

app.use("/restaurant", RestaurantRoutes)

export default app;  