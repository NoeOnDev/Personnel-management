import { Router } from "express";
import { userController } from "./userDI";

const router = Router();

router.post("/users", userController.createUser.bind(userController));
router.get("/users/:uuid", userController.getUserByUuid.bind(userController));
router.get(
  "/users/username/:username",
  userController.getUserByUsername.bind(userController)
);
router.get(
  "/users/email/:email",
  userController.getUserByEmail.bind(userController)
);
router.get("/users", userController.getAllUsers.bind(userController));
router.put("/users/:uuid", userController.updateUser.bind(userController));
router.patch("/users/:uuid", userController.patchUser.bind(userController));
router.delete("/users/:uuid", userController.deleteUser.bind(userController));

export default router;
