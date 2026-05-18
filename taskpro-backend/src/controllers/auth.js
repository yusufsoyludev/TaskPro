import { loginUser, registerUser, updateProfile } from "../services/auth.js";

const serializeUser = user => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  theme: user.theme,
  avatarURL: user.avatarURL,
});

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: "User successfully registered",
    data: serializeUser(user),
  });
};
export const loginUserController = async (req, res) => {
  const { token, user } = await loginUser(req.body);
  res.status(200).json({
    status: 200,
    message: "Successfully logged in",
    data: {
      token,
      user: serializeUser(user),
    },
  });
};
export const getCurrentUserController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 200,
    message: "Successfully found user",
    data: serializeUser(user),
  });
};
export const logoutUserController = async (req, res) => {
  res.status(204).send();
};

export const updateProfileController = async (req, res) => {
  const updatedUser = await updateProfile(req.user._id, req.body);
  res.status(200).json({
    status: 200,
    message: "Profile updated successfully",
    data: {
      user: serializeUser(updatedUser),
    },
  });
};
