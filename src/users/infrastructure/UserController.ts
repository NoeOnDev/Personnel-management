import { Request, Response } from "express";
import { UserService } from "../application/UserService";
import { serializeUser } from "./serializeUser";

type AppError = {
  message: string;
};

export class UserController {
  constructor(private userService: UserService) {}

  private isAppError(error: unknown): error is AppError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as AppError).message === "string"
    );
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const user = await this.userService.createUser(username, email, password);
      res.status(201).json(serializeUser(user));
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users.map(serializeUser));
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getUserByUuid(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      const user = await this.userService.getUserByUuid(uuid);
      if (user) {
        res.status(200).json(serializeUser(user));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        res.status(200).json(serializeUser(user));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.status(200).json(serializeUser(user));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.userService.updateUser(uuid, req.body);
      const updatedUser = await this.userService.getUserByUuid(uuid);
      if (updatedUser) {
        res.status(200).json(serializeUser(updatedUser));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async patchUser(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.userService.patchUser(uuid, req.body);
      const updatedUser = await this.userService.getUserByUuid(uuid);
      if (updatedUser) {
        res.status(200).json(serializeUser(updatedUser));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.userService.deleteUser(uuid);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
}
