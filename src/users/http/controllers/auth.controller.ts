import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { CustomError } from "../../../_helper/customError";

const userService = new UserService();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const { user, token } = await userService.authenticateUser(
      identifier,
      password
    );
    res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
