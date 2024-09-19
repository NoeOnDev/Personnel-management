import { Request, Response } from "express";
import { UserService } from "../application/UserService";

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
      const { username, email, passwordHash } = req.body;
      const user = await this.userService.createUser(
        username,
        email,
        passwordHash
      );
      res.status(201).json(user);
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(BigInt(id));
      if (user) {
        res.status(200).json(user);
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

  public async getUserByUuid(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      const user = await this.userService.getUserByUuid(uuid);
      if (user) {
        res.status(200).json(user);
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
        res.status(200).json(user);
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
        res.status(200).json(user);
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
      const { id } = req.params;
      const user = await this.userService.getUserById(BigInt(id));
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const updatedUser = { ...user, ...req.body };
      await this.userService.updateUser(updatedUser);
      res.status(200).json(updatedUser);
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
      const { id } = req.params;
      const user = await this.userService.getUserById(BigInt(id));
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      await this.userService.deleteUser(BigInt(id));
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
