import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id:number,
        username:string,
        email: string;
        fname: string;
        lname: string;
      };
    }
  }
}

export {};
