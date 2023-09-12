import { IUser } from "../src/model/user/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
