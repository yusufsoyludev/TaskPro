import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: ["light", "violet", "dark"],
      default: "dark",
    },
    avatarURL: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const UserCollection = model('user', userSchema);