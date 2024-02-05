import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const UserSchema = new mongoose.Schema<UserType>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", UserSchema);

export default User;
