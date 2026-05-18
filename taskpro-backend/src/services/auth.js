import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserCollection } from "../db/models/user.js";
import { createHttpError } from "../utils/createHttpError.js";

export const registerUser = async (payload) => {
  const { email, password, name } = payload;
  const existingUser = await UserCollection.findOne({ email });
  if (existingUser) {
    throw createHttpError(
      409,
      "This email is already registered. Try logging in instead.",
      {
        fields: {
          email: "This email is already registered. Try logging in instead.",
        },
      },
    );
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
    throw createHttpError(401, "Incorrect email or password.");
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    throw createHttpError(401, "Incorrect email or password.");
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

export const updateProfile = async (userId, payload) => {
  const update = {};
  if (payload.name !== undefined) {
    update.name = payload.name;
  }
  if (payload.avatarUrl !== undefined) {
    update.avatarURL = payload.avatarUrl;
  }

  const user = await UserCollection.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return user;
};
