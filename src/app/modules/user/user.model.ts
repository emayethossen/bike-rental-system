import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
// import bcrypt from "bcrypt";
// import config from "../../config";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
  },
  { timestamps: true },
);

// Pre-save middleware hook to hash password before saving
// UserSchema.pre("save", async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   if (user.isModified("password") || user.isNew) {
//     user.password = await bcrypt.hash(
//       user.password,
//       Number(config.bcrypt_salt_rounds),
//     );
//   }
//   next();
// });

export const User = model<TUser>("User", UserSchema);
