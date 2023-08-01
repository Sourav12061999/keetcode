import { Router } from "express";
import { UserModel } from "src/Schemas";
import { compare, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "src/constants";
import { hash } from "bcrypt";
import { AuthMiddleware } from "src/middleware";

const router = Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({
        isError: false,
        isSuccess: false,
        error: {
          message: "Invalid Credentials",
        },
      });
      return;
    }
    const user = await UserModel.findOne({ email }).lean().exec();
    if (!user) {
      res.status(200).json({
        isError: false,
        isSuccess: false,
        error: {
          message: "User not found",
        },
      });
      return;
    }
    const isMatch = await compare(password, user.Password);
    if (!isMatch) {
      res.status(200).json({
        isError: false,
        isSuccess: false,
        error: {
          message: "Invalid Email or Password",
        },
      });
      return;
    }
    const token = sign(user._id, JWT_SECRET);
    res.status(200).json({
      isError: false,
      isSuccess: true,
      data: {
        Name: user.Name,
        Email: user.Email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      isSuccess: false,
      error,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    if (!Email || !Password || !Name) {
      res.status(200).json({
        isError: false,
        isSuccess: false,
        error: {
          message: "Invalid Credentials",
        },
      });
      return;
    }

    const userExists = await UserModel.findOne({ Email }).lean().exec();
    if (userExists) {
      return res.status(200).json({
        isError: false,
        isSuccess: false,
        error: {
          message: "User already exists. Please signin",
        },
      });
    }
    const salt = await genSalt(2);
    const hashedPassowrd = await hash(Password, salt);
    const user = await UserModel.create({
      Email,
      Password: hashedPassowrd,
      Name,
    });

    const token = sign(user._id, JWT_SECRET);
    res.status(200).json({
      isError: false,
      isSuccess: true,
      data: {
        name: user.Name,
        email: user.Email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      isSuccess: false,
      error,
    });
  }
});
router.get("/user", AuthMiddleware(), async (req, res) => {
  try {
    res.status(200).json({
      isError: false,
      isSuccess: true,
      data: res.locals.user,
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      isSuccess: false,
      error,
    });
  }
});
