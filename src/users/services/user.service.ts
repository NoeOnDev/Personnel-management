import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { CustomError } from "../../_helper/customError";
import env from "../../_config/env.config";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(user: User): Promise<User> {
    const existingUserByEmail = await this.userRepository.findByEmail(
      user.email
    );
    if (existingUserByEmail) {
      throw new CustomError("Email already in use", 400);
    }

    const existingUserByUsername = await this.userRepository.findByUsername(
      user.username
    );
    if (existingUserByUsername) {
      throw new CustomError("Username already in use", 400);
    }

    user.password = await argon2.hash(user.password);
    return this.userRepository.create(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) {
      throw new CustomError("User not found", 404);
    }
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return this.userRepository.delete(id);
  }

  async authenticateUser(
    identifier: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user =
      (await this.userRepository.findByEmail(identifier)) ||
      (await this.userRepository.findByUsername(identifier));
    if (!user) {
      throw new CustomError("Invalid email/username or password", 401);
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      throw new CustomError("Invalid email/username or password", 401);
    }

    const secret = env.jwt.secret;
    console.log("JWT Secret:", secret);

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: env.jwt.expiresIn,
    });

    return { user, token };
  }
}