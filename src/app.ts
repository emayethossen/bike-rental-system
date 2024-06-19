import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { BikeRoutes } from "./app/modules/bike/bike.route";
import { RentalRoutes } from "./app/modules/rentals/rentals.route";
import {
  errorHandler,
  notFoundHandler,
} from "./app/middlewares/error.middleware";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", UserRoutes);
app.use("/api", BikeRoutes);
app.use("/api", RentalRoutes);

// Not Found handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
