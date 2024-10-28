import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../_config/env.config";

export interface AuthRequest extends Request {
  user?: { id: number };
}

const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token is missing or invalid" });
    return;
  }

  const secret = env.jwt.secret;
  console.log(secret);
  if (!secret) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.user = user as AuthRequest["user"];
    next();
  });
};

export default authenticateJWT;
