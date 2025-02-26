import { Request } from "express";

export default interface AuthUser extends Request {
  user?: {
    name: string;
    email: string;
    id?:string
  };
}