import { Request, Response, NextFunction } from "express";

const ErrorHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (error) {
    res.status(400).json({
      isError: true,
      error,
    });
  }
};

export default ErrorHandlerMiddleware;
