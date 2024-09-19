import { PostgresUserRepository } from "./PostgresUserRepository";
import { BcryptPasswordHasher } from "./BcryptPasswordHasher";
import { UserService } from "../application/UserService";
import { UserController } from "./UserController";
import { pool } from "../../config/dbConnection";

const userRepository = new PostgresUserRepository(pool);
const passwordHasher = new BcryptPasswordHasher();
const userService = new UserService(userRepository, passwordHasher);
const userController = new UserController(userService);

export { userController };
