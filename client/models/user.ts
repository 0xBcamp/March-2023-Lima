import { Schema, Document, Types } from 'mongoose';
import mongoose from "mongoose";

export interface IUserDto {
  _id?: string;
  firstName?: string;
  lastName?: string;
  owner: string;
  imageId?: number;
  gender?: string;
  tokenId?: number;
  properties?: Types.Array<Types.ObjectId>;
  usdcBalance?: String;
  bookings?: Types.Array<Types.ObjectId>;
  rewards?: Types.Array<Types.ObjectId>;
}

export interface IUser extends Document {
  _id?: string;
  firstName?: string;
  lastName?: string;
  owner: string;
  imageId?: number;
  gender?: string;
  tokenId?: number;
  properties?: Types.Array<Types.ObjectId>;
  bookings?: Types.Array<Types.ObjectId>;
  rewards?: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    owner: String,
    imageId: Number,
    gender: String,
    tokenId: Number,
    properties: [{ type: Types.ObjectId, ref: "Property", default: [] }],
    bookings: [{ type: Types.ObjectId, ref: "Booking", default: [] }],
    rewards: [{ type: Types.ObjectId, ref: "Reward", default: [] }],
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);