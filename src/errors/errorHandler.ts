import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof CustomError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
