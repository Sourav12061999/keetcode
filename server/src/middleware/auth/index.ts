import { Request, Response, NextFunction } from "express";
import { BearerTokenFinder } from "../..//Utils/BearerToken";
import { decode } from "jsonwebtoken";
import { UserModel } from "../../Schemas";
const AuthMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = BearerTokenFinder(req.headers.authorization);
    if (token === null) {
      return res.status(403).json({
        isError: true,
        isSuccess: false,
        error: { message: "Unauthorized" },
      });
    }
    const id = decode(token);
    if (!id && typeof id !== "string") {
      return res.status(403).json({
        isError: true,
        isSuccess: false,
        error: { message: "Unauthorized" },
      });
    }
    const user = await UserModel.findById(id).lean().exec();
    if (!user) {
      return res.status(403).json({
        isError: true,
        isSuccess: false,
        error: { message: "Unauthorized" },
      });
    }
    res.locals.user = user;
    next();
  };
};

export default AuthMiddleware;
