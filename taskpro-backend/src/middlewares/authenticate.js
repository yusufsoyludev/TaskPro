import jwt from "jsonwebtoken";
import { UserCollection } from "../db/models/user.js";
import { createHttpError } from "../utils/createHttpError.js";

export const authenticate = async (req, resizeBy, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, "Authorization header missing"));
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(createHttpError(401, "Invalid authorization header"));
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserCollection.findById(payload.sub);
    if (!user) {
      return next(createHttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch {
    next(createHttpError(401, "Unauthorized"));
  }
};
