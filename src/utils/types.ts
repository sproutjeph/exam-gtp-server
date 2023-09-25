import { Request } from "express";
import { IUser } from "@/model/user/user";

export interface TypedRequest extends Request {
  user?: IUser;
}
