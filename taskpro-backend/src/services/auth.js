import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserCollection } from "../db/models/user.js";
import { createHttpError } from "../utils/createHttpError.js";

export const registerUser = async (payload) => {
  const { email, password, name } = payload;
  const existingUser = await UserCollection.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserCollection.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};
export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Email or password is wrong");
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    throw createHttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign(
    {
      sub: user._id.toHexString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );
  return {
    token,
    user,
  };
};
