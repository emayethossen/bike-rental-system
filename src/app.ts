import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { BikeRoutes } from "./app/modules/bike/bike.route";
import { RentalRoutes } from "./app/modules/rentals/rentals.route";
// import { errorHandler } from "./app/middlewares/error.middleware";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", UserRoutes);
app.use("/api", BikeRoutes);
app.use("/api", RentalRoutes);

// Global Error Handler
// app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
