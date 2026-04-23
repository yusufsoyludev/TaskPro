import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: "User successfully registered",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};
export const loginUserController = async (req, res) => {
  const { token, user } = await loginUser(req.body);
  res.status(200).json({
    status: 200,
    message: "Successfully logged in",
    data: {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        avatarURL: user.avatarURL,
      },
    },
  });
};
export const getCurrentUserController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 200,
    message: "Successfully found user",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};
export const logoutUserController = async (req, res) => {
  res.status(204).send();
};
