import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { loginUser } from "../controllers/auth.controller";
import { validateRequest } from "../../../_middlewares/validation.middleware";
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} from "../validations/user.validation";

const userRoutes = Router();

userRoutes.post("/", validateRequest(createUserSchema), createUser);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", validateRequest(updateUserSchema), updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.post("/login", validateRequest(loginUserSchema), loginUser);

export default userRoutes;
