import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// making the password hash
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user?.password as string,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<TUser>("User", userSchema);
