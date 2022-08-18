import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    const logMessage = `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`;
    if (status >= 500) {
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
