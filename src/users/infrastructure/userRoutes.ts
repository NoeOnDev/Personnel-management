import { Router } from "express";
import { userController } from "./userDI";

const router = Router();

router.post("/users", userController.createUser.bind(userController));
router.get("/users/:id", userController.getUserById.bind(userController));
router.get(
  "/users/uuid/:uuid",
  userController.getUserByUuid.bind(userController)
);
router.get(
  "/users/username/:username",
  userController.getUserByUsername.bind(userController)
);
router.get(
  "/users/email/:email",
  userController.getUserByEmail.bind(userController)
);
router.put("/users/:id", userController.updateUser.bind(userController));
router.delete("/users/:id", userController.deleteUser.bind(userController));

export default router;
