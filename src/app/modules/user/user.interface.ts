export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
};
