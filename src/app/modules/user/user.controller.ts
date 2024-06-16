import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import { TUser } from "./user.interface";

export const userController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const userData = userValidation.userValidationSchema.parse(req.body);
      const result = await UserServices.createUser(userData);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserServices.authenticateUser(email, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed",
        });
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  getProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await UserServices.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User profile retrieved successfully",
        data: user,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const updatedData = req.body as Partial<TUser>;

      const user = await UserServices.updateUser(userId, updatedData);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        data: user,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },
};
