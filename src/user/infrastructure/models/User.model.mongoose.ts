import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  userId: {
    type: Number,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: true,
  },
  profession: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

export const UserModel = model("user", UserSchema);
