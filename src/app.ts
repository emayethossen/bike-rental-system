import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { BikeRoutes } from "./app/modules/bike/bike.route";
import { RentalRoutes } from "./app/modules/rentals/rentals.route";
import paymentRoutes from "./app/modules/payments/payment.route";
import fullPayRoutes from "./app/modules/fullPay/fullPayment";

import {
  errorHandler,
  notFoundHandler,
} from "./app/middlewares/error.middleware";
import bodyParser from "body-parser";

const app: Application = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// application routes
app.use("/api", UserRoutes);
app.use("/api", BikeRoutes);
app.use("/api", RentalRoutes);
app.use("/api", paymentRoutes);
app.use("/api", fullPayRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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

export default app;
