import { Schema, model } from "mongoose";
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      defaul: "",
    },
    priority: {
      type: String,
      enum: ["without","low", "medium", "high"],
      default:'without',
    },
    deadline: {
      type: Date,
      default: null,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const CardCollection = model("card", cardSchema);
