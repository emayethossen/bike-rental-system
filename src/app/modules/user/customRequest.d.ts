// customRequest.d.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from "express";
import { TUser } from "./user.interface"; // Adjust the import path accordingly

declare module "express-serve-static-core" {
  interface Request {
    user?: TUser;
  }
}
