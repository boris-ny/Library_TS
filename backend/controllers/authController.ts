import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.models";
import jwt from "jsonwebtoken";

// Controller for Login
export const login = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET || "";

  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    console.log(req.body.password, user.password);

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    const userData = {
      id: user.id,
      permissionLevel: user.permissionLevel,
    };
    let token = jwt.sign(userData, secret, {
      expiresIn: "5 days",
    });

    let refresh_token = jwt.sign(userData, secret, {
      expiresIn: "30 days",
    });

    return res
      .status(201)
      .json({
        accessToken: token,
        refreshToken: refresh_token,
        user: {
          id: user.id,
          firstname: user.firstName,
          permission: user.permissionLevel,
        },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Users Error" });
  }
};

/**
 * Middleware function to check if a valid JWT access token is present in the request headers.
 * If a valid token is present, the request object is updated with user information.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const validJWTNeeded = (
  req: Request & {
    user?: any;
  },
  res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    try {
      const secret = process.env.JWT_SECRET || "";
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * Middleware function to check if the user making the request has the required permission level.
 * @param required_permission_level - Array of permission levels required to access the resource
 * @returns Express middleware function
 */
export const permissionLevelRequired = (
  required_permission_level: number[]
) => {
  return (
    req: Request & {
      user?: any;
    },
    res: Response,
    next: NextFunction
  ) => {
    //console.log(req.user);
    const userPermissionLevel: number = parseInt(req.user.permissionLevel);
    if (required_permission_level.includes(userPermissionLevel)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
